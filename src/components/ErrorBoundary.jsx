import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '24px', fontFamily: 'Inter, sans-serif', color: '#191c1e', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', color: '#ba1a1a', marginBottom: '16px' }}>Terjadi kesalahan aplikasi</h1>
          <pre style={{ backgroundColor: '#f2f4f6', padding: '16px', borderRadius: '8px', overflow: 'auto', fontSize: '14px' }}>
            {this.state.error?.message}
            {'\n\n'}
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload(); }}
            style={{ marginTop: '16px', padding: '12px 24px', backgroundColor: '#00355f', color: '#ffffff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
          >
            Muat Ulang Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
