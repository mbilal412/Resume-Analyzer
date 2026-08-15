import ImageKit, { toFile } from '@imagekit/nodejs';
import { PDFParse } from 'pdf-parse';

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const parseResumePdf = async (fileBuffer) => {
    const resume = await (new PDFParse(Uint8Array.from(fileBuffer))).getText();
    const resumeContent = resume.text;

    if (!resumeContent || !resumeContent.trim()) {
        throw new Error('Resume content is empty after parsing.');
    }

    return resumeContent;
};

export const uploadResumeToImageKit = async (file) => {
    return client.files.upload({
        file: await toFile(file.buffer, 'file.pdf', { type: file.mimetype }),
        fileName: `resume_${Date.now()}.pdf`,
        folder: 'crack-it/resumes'
    });
};
