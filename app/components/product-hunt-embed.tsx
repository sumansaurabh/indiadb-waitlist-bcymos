import React from 'react';

export function ProductHuntEmbed() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      border: '1px solid rgb(224, 224, 224)',
      borderRadius: '12px',
      padding: '20px',
      maxWidth: '500px',
      background: 'rgb(255, 255, 255)',
      boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 8px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '12px'
      }}>
        <img
          alt="Indbase"
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '8px',
            objectFit: 'cover',
            flexShrink: 0
          }}
          src="https://ph-files.imgix.net/78ba5d58-cfe3-42aa-a886-a7139a858d64.png?auto=format&fit=crop&w=80&h=80"
        />
        <div style={{
          flex: '1 1 0%',
          minWidth: '0px'
        }}>
          <h3 style={{
            margin: '0px',
            fontSize: '18px',
            fontWeight: 600,
            color: 'rgb(26, 26, 26)',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>Indbase</h3>
          <p style={{
            margin: '4px 0px 0px',
            fontSize: '14px',
            color: 'rgb(102, 102, 102)',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            MozBoxOrient: 'vertical'
          }}>Database for India's Builders</p>
        </div>
      </div>
      <a
        href="https://www.producthunt.com/products/indbase?embed=true&utm_source=embed&utm_medium=post_embed"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '12px',
          padding: '8px 16px',
          background: 'rgb(255, 97, 84)',
          color: 'rgb(255, 255, 255)',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 600
        }}
      >
        Check it out on Product Hunt →
      </a>
    </div>
  );
}
