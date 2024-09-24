import AdmZip from 'adm-zip';
import path from 'path';

export interface ZipOptions {
    filePath: string | string[];
    zipFileName?: string;
}

async function useToZipFile({ filePath, zipFileName }: ZipOptions): Promise<string> {
    const zip = new AdmZip();

    // If filePath is a string, convert it to an array for consistent processing
    const filePaths = Array.isArray(filePath) ? filePath : [filePath];

    // Determine zip file name
    if (!zipFileName) {
        const firstFilePath = filePaths[0];
        zipFileName = `${path.basename(firstFilePath)}.zip`;
    }

    // Add each file to the zip archive
    filePaths.forEach((file) => {
        zip.addLocalFile(file);
    });

    // Write the zip file to the specified location
    zip.writeZip(zipFileName);

    return zipFileName;
}

export default useToZipFile;
