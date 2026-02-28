# Backend API Guidelines for GitHub Copilot

## Environment Variables & API Keys

### ⚠️ CRITICAL RULE: Server-Side API Keys
**ALL server-side API keys, secrets, and credentials MUST be stored in `.env` file**

```env
# .env file
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secret-key-here
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
```

### Using Environment Variables in API Routes
```typescript
import { env } from "~/lib/env.server";

export async function loader() {
  // ✅ CORRECT - Use from env.server.ts
  const apiKey = env.OPENAI_API_KEY;
  const dbUrl = env.DATABASE_URL;
  
  // ❌ WRONG - Never hardcode
  const apiKey = "sk-hardcoded-key";
  
  return Response.json({ status: "ok" });
}
```

### Public URL Configuration
```typescript
import { env } from "~/lib/env.server";

export async function action() {
  // Use PUBLIC_URL for absolute URLs
  const callbackUrl = `${env.PUBLIC_URL}/api/callback`;
  const resetUrl = `${env.PUBLIC_URL}/reset-password?token=${token}`;
  
  return Response.json({ callbackUrl });
}
```

**When prompted to update PUBLIC_URL**:
1. Open `.env` file
2. Update: `PUBLIC_URL=https://new-url.com`
3. Restart server

## Creating API Routes in Remix

### File Naming Convention
API routes MUST use the `api.` prefix in the filename:
```
app/routes/api.health.tsx        ✅ Correct
app/routes/api.users.tsx          ✅ Correct
app/routes/api.products.$id.tsx   ✅ Correct
app/routes/users.tsx              ❌ Wrong (not an API route)
```

### HTTP Methods

#### GET Requests - Use `loader`
```typescript
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // Extract query params
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  // Return JSON using Response.json()
  return Response.json({
    data: { id },
    timestamp: new Date().toISOString(),
  });
}
```

#### POST/PUT/DELETE/PATCH - Use `action`
```typescript
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  // Parse JSON body
  const body = await request.json();

  // Or parse form data
  const formData = await request.formData();
  const name = formData.get("name");

  // Check HTTP method
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  return Response.json({ success: true, data: body });
}
```

## Response Format

### ✅ ALWAYS Use `Response.json()`
**NEVER use the deprecated `json()` utility from @remix-run/node**

```typescript
// ✅ CORRECT - Modern standard
return Response.json({ status: "ok" });

// ✅ CORRECT - With status code
return Response.json(
  { error: "Not found" },
  { status: 404 }
);

// ✅ CORRECT - With custom headers
return Response.json(
  { data: [] },
  {
    status: 200,
    headers: {
      "Cache-Control": "max-age=3600",
      "X-Custom-Header": "value"
    }
  }
);

// ❌ WRONG - Deprecated
import { json } from "@remix-run/node";
return json({ status: "ok" }); // DO NOT USE
```

## Error Handling

### Standard Error Response Pattern
```typescript
export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.json();

    // Validation
    if (!body.email) {
      return Response.json(
        {
          error: "Validation failed",
          details: { email: "Email is required" }
        },
        { status: 400 }
      );
    }

    // Business logic
    const result = await processData(body);

    return Response.json({ success: true, data: result });

  } catch (error) {
    console.error("API Error:", error);

    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
```

## Type Safety

### Define Response Types
```typescript
// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

// In your route
export async function loader(): Promise<Response> {
  const response: ApiResponse<User[]> = {
    success: true,
    data: [{ id: "1", name: "John", email: "john@example.com" }],
    timestamp: new Date().toISOString(),
  };

  return Response.json(response);
}
```

## Request Parsing

### JSON Body
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const body = await request.json();
  // Use body data
}
```

### Form Data
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
}
```

### URL Parameters
```typescript
// Route: api.users.$id.tsx
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;
  return Response.json({ userId });
}
```

### Query Parameters
```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";

  return Response.json({ page, limit });
}
```

## HTTP Status Codes

Use appropriate status codes:

- **200** - Success (GET, PUT, PATCH)
- **201** - Created (POST)
- **204** - No Content (DELETE)
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (not authenticated)
- **403** - Forbidden (not authorized)
- **404** - Not Found
- **405** - Method Not Allowed
- **422** - Unprocessable Entity (semantic errors)
- **500** - Internal Server Error

```typescript
// Example with different status codes
export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "POST") {
    return Response.json({ id: "123" }, { status: 201 });
  }

  if (request.method === "DELETE") {
    return new Response(null, { status: 204 });
  }

  return Response.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
```

## Authentication & Authorization

### Example with Auth Check
```typescript
export async function loader({ request }: LoaderFunctionArgs) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Verify token
  const token = authHeader.replace("Bearer ", "");
  const user = await verifyToken(token);

  if (!user) {
    return Response.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  return Response.json({ user });
}
```

## CORS Configuration

### Adding CORS Headers
```typescript
export async function loader() {
  const data = { status: "ok" };

  return Response.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

// Handle preflight requests
export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  // Handle actual request
  return Response.json({ success: true });
}
```

## Best Practices

1. **Always validate input** before processing
2. **Use try-catch** for error handling
3. **Return appropriate status codes**
4. **Include timestamps** in responses
5. **Log errors** for debugging
6. **Never expose sensitive data** in error messages
7. **Use TypeScript types** for request/response
8. **Document your APIs** with comments
9. **Version your APIs** if needed (api.v1.users.tsx)
10. **Use Response.json()** instead of deprecated utilities

## Example: Complete API Route

```typescript
import type { ActionFunctionArgs } from "@remix-run/node";

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export async function action({ request }: ActionFunctionArgs) {
  // Only allow POST
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Parse request body
    const body = await request.json() as CreateUserRequest;

    // Validate
    if (!body.name || !body.email) {
      return Response.json(
        {
          error: "Validation failed",
          details: {
            name: !body.name ? "Name is required" : undefined,
            email: !body.email ? "Email is required" : undefined,
          }
        },
        { status: 400 }
      );
    }

    // Create user (example)
    const user: UserResponse = {
      id: crypto.randomUUID(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    };

    // Return success
    return Response.json(
      { success: true, data: user },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating user:", error);

    return Response.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
```

## Testing API Routes

```bash
# GET request
curl http://localhost:5173/api/health

# POST request with JSON
curl -X POST http://localhost:5173/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com"}'

# With authentication
curl http://localhost:5173/api/users \
  -H "Authorization: Bearer your-token-here"
```

## Reference

- Remix Docs: https://remix.run/docs/en/main/route/loader
- Response.json(): https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static
- HTTP Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
