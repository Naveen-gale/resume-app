import PDFDocument from 'pdfkit';

export const buildResumePDF = (resumeData, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="Resume-${resumeData.profileName.replace(/\\s+/g, '_')}.pdf"`);
  doc.pipe(res);

  // Resume content logic
  const content = resumeData.generatedResume || {};

  // Header
  doc.fontSize(24).font('Helvetica-Bold').text(resumeData.profileName, { align: 'center' });
  doc.fontSize(14).font('Helvetica').text(resumeData.jobTitle, { align: 'center' });
  doc.moveDown();

  // Summary
  if (content.summary) {
    doc.fontSize(16).font('Helvetica-Bold').text('Professional Summary');
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(content.summary);
    doc.moveDown();
  }

  // Skills
  if (content.skills && content.skills.length > 0) {
    doc.fontSize(16).font('Helvetica-Bold').text('Technical Skills');
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica').text(content.skills.join(', '));
    doc.moveDown();
  }

  // Experience
  if (content.experience && content.experience.length > 0) {
    doc.fontSize(16).font('Helvetica-Bold').text('Work Experience');
    doc.moveDown(0.5);
    content.experience.forEach(exp => {
      doc.fontSize(14).font('Helvetica-Bold').text(exp.role);
      doc.fontSize(12).font('Helvetica-Oblique').text(`${exp.company} | ${exp.duration}`);
      doc.moveDown(0.3);
      if (exp.bullets) {
        doc.font('Helvetica');
        exp.bullets.forEach(bullet => {
          doc.text(`• ${bullet}`, { indent: 20 });
        });
      }
      doc.moveDown();
    });
  }

  // Education
  if (content.education && content.education.length > 0) {
    doc.fontSize(16).font('Helvetica-Bold').text('Education');
    doc.moveDown(0.5);
    content.education.forEach(edu => {
      doc.fontSize(14).font('Helvetica-Bold').text(edu.degree);
      doc.fontSize(12).font('Helvetica').text(`${edu.institution} | ${edu.year}`);
      doc.moveDown();
    });
  }

  // Certifications
  if (content.certifications && content.certifications.length > 0) {
    doc.fontSize(16).font('Helvetica-Bold').text('Certifications');
    doc.moveDown(0.5);
    content.certifications.forEach(cert => {
      doc.fontSize(12).font('Helvetica').text(`• ${cert}`, { indent: 20 });
    });
  }

  doc.end();
};

export const buildCoverLetterPDF = (coverLetterData, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="CoverLetter-${coverLetterData.profileName.replace(/\\s+/g, '_')}.pdf"`);
  doc.pipe(res);

  // Cover Letter content logic
  const content = coverLetterData.generatedCoverLetter || {};

  // Header
  doc.fontSize(24).font('Helvetica-Bold').text(coverLetterData.profileName);
  doc.moveDown();
  doc.fontSize(12).font('Helvetica').text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  doc.moveDown(2);

  // Recipient
  if (content.recipientName) {
    doc.fontSize(12).font('Helvetica-Bold').text(content.recipientName);
    doc.moveDown();
  }

  // Paragraphs
  if (content.paragraphs && content.paragraphs.length > 0) {
    doc.font('Helvetica');
    content.paragraphs.forEach(paragraph => {
      doc.text(paragraph, { align: 'justify' });
      doc.moveDown();
    });
  }

  // Closing
  if (content.closing) {
    doc.moveDown();
    doc.text(content.closing);
    doc.text(coverLetterData.profileName);
  }

  doc.end();
};
