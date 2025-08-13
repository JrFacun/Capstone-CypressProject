class contactUs{
   nameText =  '[data-qa="name"]';
   emailText = '[data-qa="email"]';
   subjectText = '[data-qa="subject"]';
   messageText = '[data-qa="message"]';
   uploadButton = 'input[type="file"]';
   submitButton  = '[data-qa="submit-button"]';
 
   successMessage = '#contact-page > div.row > div.col-sm-8 > div > div.status.alert.alert-success';
    homeButton = '#form-section > a';

    //File Uploads 
      pngFileName = 'UploadFile.png';
      txtFileName = 'UploadFile.txt';
      jpgFileName = 'UploadFile.jpg';
      pptxFileName = 'UploadFile.pptx';
fillUpForm(name,email,subject,message) {
  if (name) {
    cy.get(this.nameText).type(name);
  }

  if (email) {
    cy.get(this.emailText).type(email);
  }

  if (subject) {
    cy.get(this.subjectText).type(subject);
  }

  if (message) {
    cy.get(this.messageText).type(message);
  }
       cy.get(this.submitButton).click();
    };
};


export default contactUs;