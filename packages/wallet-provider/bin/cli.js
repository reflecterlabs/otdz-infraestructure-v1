#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const foldersToCopy = [
    'app',
    'components',
    'hooks',
    'infrastructure',
    'public',
    'src'
];

const filesToCopy = [
    'middleware.ts',
    'next.config.ts',
    'tsconfig.json',
    'postcss.config.mjs',
    'eslint.config.mjs'
];

const targetDir = process.cwd();
const packageDir = path.join(__dirname, '..');

console.log('🚀 Deploying Social Login Smart Wallet system...');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Copy folders
foldersToCopy.forEach(folder => {
    const src = path.join(packageDir, folder);
    const dest = path.join(targetDir, folder);

    if (fs.existsSync(src)) {
        console.log(`  📁 Copying ${folder}...`);
        copyRecursiveSync(src, dest);
    }
});

// Copy files
filesToCopy.forEach(file => {
    const src = path.join(packageDir, file);
    const dest = path.join(targetDir, file);

    if (fs.existsSync(src)) {
        console.log(`  📄 Copying ${file}...`);
        fs.copyFileSync(src, dest);
    }
});

// Update target package.json
const targetPackagePath = path.join(targetDir, 'package.json');
if (fs.existsSync(targetPackagePath)) {
    console.log('  📜 Updating package.json scripts and dependencies...');
    try {
        const pkg = JSON.parse(fs.readFileSync(targetPackagePath, 'utf8'));

        // Add scripts
        pkg.scripts = pkg.scripts || {};
        pkg.scripts.dev = "next dev";
        pkg.scripts.build = "next build";
        pkg.scripts.start = "next start";
        pkg.scripts.lint = "next lint";

        // Add necessary dependencies (Overwriting to ensure compatibility)
        pkg.dependencies = pkg.dependencies || {};
        const depsToAdd = {
            "next": "^15.2.3",
            "react": "^19.0.0",
            "react-dom": "^19.0.0",
            "lucide-react": "^0.474.0",
            "framer-motion": "^12.0.6",
            "@clerk/nextjs": "^6.36.10",
            "@chipi-stack/nextjs": "^12.7.0",
            "clsx": "^2.1.1",
            "tailwind-merge": "^3.0.1"
        };

        Object.keys(depsToAdd).forEach(dep => {
            // Force update core dependencies to ensure compatibility with Clerk
            pkg.dependencies[dep] = depsToAdd[dep];
        });

        pkg.devDependencies = pkg.devDependencies || {};
        const devDepsToAdd = {
            "typescript": "^5",
            "@types/node": "^20",
            "@types/react": "^19",
            "@types/react-dom": "^19",
            "postcss": "^8",
            "tailwindcss": "^4.0.0",
            "@tailwindcss/postcss": "^4.0.0"
        };

        Object.keys(devDepsToAdd).forEach(dep => {
            // Force update dev dependencies
            pkg.devDependencies[dep] = devDepsToAdd[dep];
        });

        fs.writeFileSync(targetPackagePath, JSON.stringify(pkg, null, 2));
        console.log('  ✨ package.json updated with compatible versions.');
    } catch (error) {
        console.warn('  ⚠️ Could not update package.json automatically. Please add Next.js scripts manually.');
    }
}

console.log('\n✅ System deployed successfully!');
console.log('Next steps:');
console.log('1. Run: npm install --legacy-peer-deps');
console.log('2. Set up your .env.local with Clerk and Chipi credentials');
console.log('3. Run: npm run dev');
