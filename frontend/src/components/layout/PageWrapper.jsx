import PageTransition from '../animations/PageTransition';

const PageWrapper = ({ children, className = '' }) => {
  return (
    <PageTransition>
      <div className={`px-6 py-6 max-w-7xl mx-auto ${className}`}>
        {children}
      </div>
    </PageTransition>
  );
};

export default PageWrapper;
