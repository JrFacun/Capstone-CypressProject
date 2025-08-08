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
fillUpForm(email, password,subject,message) {
        cy.get(this.nameText).type(email);
        cy.get(this.emailText).type(password);
        cy.get(this.subjectText).type(subject);
        cy.get(this.messageText).type(message);
       cy.get(this.submitButton).click();
    };
};


export default contactUs;