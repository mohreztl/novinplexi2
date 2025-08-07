// Simple test to check if Next.js can compile without routing conflicts
const { exec } = require('child_process');

console.log('Testing Next.js compilation...');

exec('npm run build', { cwd: process.cwd() }, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Build failed:', error.message);
    if (error.message.includes('You cannot use different slug names')) {
      console.error('❌ Dynamic route conflict still exists');
    }
    return;
  }
  
  if (stderr) {
    console.warn('⚠️ Build warnings:', stderr);
  }
  
  console.log('✅ Build successful - no routing conflicts');
  console.log(stdout);
});
