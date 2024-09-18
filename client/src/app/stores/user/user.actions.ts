// TODO später hiermit einen Store bauen und alle User Actionen auf den Store umstellen

export class Login {
    readonly type = UserActions.Login;
    constructor(public loginData: { username: string, password: string }) { }
}

export enum UserActions {
    Login = '[User] Login'
} 