type ErrorMessageProps = {
  children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="bg-white text-black text-sm uppercase font-bold p-3 text-center">
      {children}
    </p>
  )
}
