import { Toaster } from "react-hot-toast"

const Toaste = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: '#d4c9b0',
          color: '#1a1a1a',
          fontFamily: '"Courier New", Courier, monospace',
          fontWeight: '600',
          fontSize: '12px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          border: '1px solid #1a1a1a',
          borderRadius: '0px',
          padding: '12px 20px',
          boxShadow: '4px 4px 0px #1a1a1a',
        },
        success: {
          style: {
            background: '#d4c9b0',
            color: '#161616',
            border: '1px solid #1a1a1a',
            boxShadow: '4px 4px 0px #1a1a1a',
          },
          iconTheme: {
            primary: '#28a745',
            secondary: '#d4c9b0',
          },
        },
        error: {
          style: {
            background: '#8b1e1e',
            color: '#d4c9b0',
            border: '1px solid #1a1a1a',
            boxShadow: '4px 4px 0px #1a1a1a',
          },
          iconTheme: {
            primary: '#d4c9b0',
            secondary: '#8b1e1e',
          },
        },
        loading: {
          style: {
            background: '#d4c9b0',
            color: '#1a1a1a',
            border: '1px solid #1a1a1a',
            boxShadow: '4px 4px 0px #1a1a1a',
          },
          iconTheme: {
            primary: '#b03a2e',
            secondary: '#d4c9b0',
          },
        },
        duration: 3000,
      }}
    />
  )
}

export default Toaste