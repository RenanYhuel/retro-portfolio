import React from "react";
import "../styles/globals.css";
export const metadata = {
    title: "Retro Portfolio",
    description: "A handcrafted retro-style developer portfolio",
};
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body>
                <div className="frame">{children}</div>
            </body>
        </html>
    );
}
