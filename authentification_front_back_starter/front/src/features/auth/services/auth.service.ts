export class AuthService {
      static saveToken(token: string){
        localStorage.setItem("token", token);
    }


    static getToken():string | null {
        return localStorage.getItem("token");
    }

   static clearToken(){
        localStorage.removeItem("token");
    }

   static isAuthenticated(): boolean{
        return !!localStorage.getItem("token")
    }
}