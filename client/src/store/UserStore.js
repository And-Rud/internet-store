import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    //при зміні цих змінних компоненти будуть перерендерюватися
    this._isAuth = false;
    this._user = {};
    makeAutoObservable(this);
  }

  //створюєм екшн які ці стани змінюють
  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}
