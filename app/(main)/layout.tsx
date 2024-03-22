interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
        {children}
    </section>
  )
}

export default Layout