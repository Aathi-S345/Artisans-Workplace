export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} VishwaKarma. All rights reserved.</p>
      </div>
    </footer>
  )
}