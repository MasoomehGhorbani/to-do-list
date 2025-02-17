export interface Item{
    id:string,
    content:string,
    isChecked:boolean
}
export default class ListItem implements Item{
    constructor(
        private _id:string='',
        private _content:string='',
        private _isChecked:boolean=false,
    ){}
    get id():string{
        return this._id
    }
    set id(id:string){
        this._id=id
    }
    get content():string{
        return this._content
    }
    set content(content:string){
        this._content=content
    }
    get isChecked():boolean{
        return this._isChecked
    }
    set isChecked(isCheked:boolean){
        this._isChecked=isCheked
    }
}


