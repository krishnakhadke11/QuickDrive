export class User{
    constructor(
        private _token:string,
        private _refreshToken:string
    ){}
    get token(){
        return this._token;
    }

    set token(token : string){
        this._token = token
    }

    get refreshToken(){
        return this._refreshToken;
    }
    set refreshToken(refreshToken : string){
        this.refreshToken = refreshToken;
    }
}