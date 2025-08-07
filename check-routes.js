// Check for Next.js dynamic route conflicts
const fs = require('fs');
const path = require('path');

function findDynamicRoutes(dir, basePath = '') {
  const routes = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      const currentPath = path.join(basePath, item);
      
      // Check if this is a dynamic route folder
      if (item.startsWith('[') && item.endsWith(']')) {
        const paramName = item.slice(1, -1);
        routes.push({
          path: currentPath,
          param: paramName,
          level: basePath.split(path.sep).length
        });
      }
      
      // Recursively check subdirectories
      routes.push(...findDynamicRoutes(fullPath, currentPath));
    }
  }
  
  return routes;
}

function checkConflicts(routes) {
  const conflicts = [];
  
  // Group routes by their parent path
  const routesByParent = {};
  routes.forEach(route => {
    const parentPath = path.dirname(route.path);
    if (!routesByParent[parentPath]) {
      routesByParent[parentPath] = [];
    }
    routesByParent[parentPath].push(route);
  });
  
  // Check for conflicts within each parent path
  Object.entries(routesByParent).forEach(([parentPath, routesInParent]) => {
    if (routesInParent.length > 1) {
      const params = routesInParent.map(r => r.param);
      const uniqueParams = [...new Set(params)];
      
      if (uniqueParams.length > 1) {
        conflicts.push({
          parentPath,
          conflictingRoutes: routesInParent,
          conflictingParams: uniqueParams
        });
      }
    }
  });
  
  return conflicts;
}

console.log('Scanning for dynamic route conflicts...');

const apiDir = path.join(__dirname, 'app', 'api');
const routes = findDynamicRoutes(apiDir);

console.log('Found dynamic routes:');
routes.forEach(route => {
  console.log(`  ${route.path} -> [${route.param}]`);
});

const conflicts = checkConflicts(routes);

if (conflicts.length === 0) {
  console.log('\n✅ No dynamic route conflicts found!');
} else {
  console.log('\n❌ Found dynamic route conflicts:');
  conflicts.forEach(conflict => {
    console.log(`\nParent: ${conflict.parentPath}`);
    console.log(`Conflicting parameters: ${conflict.conflictingParams.join(', ')}`);
    conflict.conflictingRoutes.forEach(route => {
      console.log(`  - ${route.path} [${route.param}]`);
    });
  });
}
