// import Swal from 'sweetalert2';

export class Utils {
    static getDefaultUrl() {
      return 'https://api.fatafat.store/api/v1.0/';  
      // return 'http://fatafatapi.epsilonium.com/api/v1.0/';
      }
    static getImages() {
      return 'http://img.fatafat.store/';
      // return 'https://api.fatafat.store/images/'
      // return 'http://fatafatapi.epsilonium.com/images/'; // store,inventory, order
    }

    static getWhatsappAdminNumber() {
      return '9651891556';
    }

    static checkTokenValid() {
      var currentDate = new Date();
      var tokenDate = new Date(localStorage.getItem('expire'));
      // console.log('current date: ', currentDate);
      // console.log('token date: ', tokenDate);
      // console.log(tokenDate >= currentDate);
      if(tokenDate >= currentDate || tokenDate != null) {
        return true;
      } else {
        return false;
      }
    }

    static setToken(data) {
      localStorage.setItem('token', data['access_token']);
      localStorage.setItem('expire', data['.expires']);
    }
    
    static getGoogleMapKey() {
      // return 'AIzaSyAHPDpyiI1qbRxYDjQguNnTvcHhK-t7y7E';
      // return 'AIzaSyBvOSh9INnA_vm_KvoSo628qoVexW3iE-o';
      // return 'AIzaSyBvdfdFYbmQJPRAebQh-bO0sYWj8X74LEU';
      return 'AIzaSyDXq-ZCLsJK-_DXcDZrEXey2VKYgp0lJs4';
    }

    static getWhatsappURL() {
      return 'https://api.chat-api.com/instance120629/sendMessage?token=10xpw1vf5gye9qmn';
      // return 'https://api.chat-api.com/instance119365/sendMessage?token=epu7vymklbgy06u3';
    }
    
    static googleAPIKey() {
      return 'https://maps.googleapis.com/maps/api/geocode/json?';
    }

    static getGoogleMapURL() {
      return 'http://www.google.com/maps/place/';
    }
    static getDistance() {
      return 10;
    }

    static getAPIBasic() {
      return {
        username: 'fatafat@fatafat.store.com',
        password: '123456',
        clientid: '1',
        grant_type: 'password'
      }
    }

    static imageURLFront() {
      return 'data:image/jpg;base64,';
    }
    
    static getAPIToken() {
      // return `Bearer eGnF6VejDYpZXcg3qCKe_d4QpQn8RVVY_BJWwX79_8d71HGukkT6TggCPyWlVO5RvmvVJmSW2EwpTMMidxyjuplG1CRM4uInex78d0M9HgckEr8Qy7HDkzI1w6WaUrbuoQfgW7YdeajvidVe_T_hMnqMPYDqPH80BGdvJrWrcAopkegBc7QwJQ5ZvFTuVwVh`
      return `Bearer ${localStorage.getItem('token')}`;
    }

      static numericOnly(event) { // restrict e,+,-,E characters in  input type number
        const charCode = (event.which) ? event.which : event.keyCode;
        // console.log(charCode);
        if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
          charCode === 44 || charCode === 46 || charCode === 47 || charCode === 61) {
          return false;
        }
        return true;
      }

      static getAppName() {
        return ' | Fatafat.store';
      }

      static getDefaultApiKey() {
        return 'yabisso-0000-9876-5432-10@@';
      }
      static getContentType() {
        return 'application/json';
      }
      static getDefaultErrorMessage() {
        return 'Something went wrong!';
      }
    static isMobile() {
        return window && window.matchMedia('(max-width: 767px)').matches;
    }
    static ngbDateToDate(ngbDate: { month, day, year }) {
        if (!ngbDate) {
            return null;
        }
        return new Date(`${ngbDate.month}/${ngbDate.day}/${ngbDate.year}`);
    }
    static dateToNgbDate(date: Date) {
        if (!date) {
            return null;
        }
        date = new Date(date);
        return { month: date.getMonth() + 1, day: date.getDate(), year: date.getFullYear() };
    }
    static scrollToTop(selector: string) {
        if (document) {
            const element = <HTMLElement>document.querySelector(selector);
            element.scrollTop = 0;
        }
    }
    static genId() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    // static showError(msg) {
    //     Swal.fire({
    //       title: 'Error!',
    //       text: `${msg}`,
    //       type: 'error',
    //       confirmButtonText: 'Ok',
    //       timer: 3500
    //     });
    //   }

    //   static showSuccess(msg) {
    //     Swal.fire({
    //       position: 'top-end',
    //       type: 'success',
    //       title: `${msg}`,
    //       showConfirmButton: false,
    //       timer: 3500
    //     });
    //   }
}
