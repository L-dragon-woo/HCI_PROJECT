const Footer = () => {
  return (
    <footer className="h-30 border-t border-gray-200 bg-white py-8">
      <div className="container mx-auto px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col gap-0.5 text-center md:text-left">
            <p className="text-lg font-bold text-gray-900">
              Coloring Book Generator
            </p>
            <p className="text-sm text-gray-500">
              © 2026 HCI Team Project. All rights reserved.
            </p>
          </div>

          <div className="flex md:items-end">
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/L-dragon-woo/HCI_PROJECT"
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-gray-900"
              >
                <span className="text-sm font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
