import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/**.ts');
project.addSourceFilesAtPaths('src/**/**.tsx');

const files = project.getSourceFiles();

function checkPath(path: string) {
    const layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared'];
    return layers.some((layer) => path.startsWith(layer));
}

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();
    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        if (checkPath(value)) {
            importDeclaration.setModuleSpecifier(`@/${value}`);
        }
    });
});

project.save();
