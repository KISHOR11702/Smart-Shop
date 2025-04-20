import { useEffect, useState } from 'react';

export default function Detail() {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        // Fetch the full HTML content from the API
        async function fetchHTML() {
            const response = await fetch('/api/google');
            const data = await response.json();
            if (data.content) {
                // Decode the HTML content before setting it
                const decodedHtml = decodeHtml(data.content);
                setHtmlContent(decodedHtml);  // Set the decoded HTML content to state
            } else {
                console.error('Failed to load content');
            }
        }

        fetchHTML();
    }, []);

    // Decode HTML entities (e.g., &lt;, &gt;) to actual HTML tags
    const decodeHtml = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <div>
            {/* Render the raw HTML content */}
            <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
}
