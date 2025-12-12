import * as React from 'react';

interface ContactFormEmailProps {
    name: string;
    email: string;
    budget: string;
    message: string;
}

export const ContactFormEmail: React.FC<ContactFormEmailProps> = ({
    name,
    email,
    budget,
    message,
}) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#1a1a1a', borderBottom: '2px solid #ea580c', paddingBottom: '10px' }}>
            New Contact Form Submission
        </h1>

        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#525252', marginBottom: '5px' }}>From</h3>
            <p style={{ margin: 0, fontSize: '16px' }}>
                <strong>{name}</strong> ({email})
            </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#525252', marginBottom: '5px' }}>Budget Range</h3>
            <p style={{ margin: 0, fontSize: '16px', color: '#ea580c', fontWeight: 'bold' }}>
                {budget || 'Not specified'}
            </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#525252', marginBottom: '5px' }}>Message</h3>
            <div style={{
                backgroundColor: '#f5f5f5',
                padding: '15px',
                borderRadius: '8px',
                borderLeft: '4px solid #ea580c'
            }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message}</p>
            </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '30px 0' }} />

        <p style={{ color: '#737373', fontSize: '12px' }}>
            This email was sent from the contact form on Cielito's World website.
        </p>
    </div>
);

export default ContactFormEmail;
