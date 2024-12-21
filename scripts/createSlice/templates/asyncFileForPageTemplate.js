module.exports = (componentName) => `import { lazy } from 'react';

    export const ${componentName}Async = lazy(() => import('./${componentName}'));
`;
