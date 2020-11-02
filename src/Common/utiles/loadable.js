import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, Loader) => {
    if (window.swUpdate === true) {
        window.location.reload(true);
        return;
    }

    const LazyComponent = lazy(importFunc);

    return props => (
        <Suspense fallback={<Loader />}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

export default loadable;
