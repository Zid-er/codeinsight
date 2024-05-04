export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <nav>
            <p>test</p>
          </nav>
          <main>{children}</main>
        </body>
      </html>
    )
  }