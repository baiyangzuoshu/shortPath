// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    number: cc.Label = null;

    _x:number=0
    _y:number=0
    // LIFE-CYCLE CALLBACKS:
    setItemColor(color:cc.Color){
        this.node.color=color
    }
    isEqual(p:cc.Vec2):boolean{
        return p.x==this._x&&p.y==this._y
    }
    setXAndY(x:number,y:number){
        this._x=x
        this._y=y
    }
    getXAndY():cc.Vec2{
        return new cc.Vec2(this._x,this._y)
    }
    // onLoad () {}
    getNumber():string{
        return this.number.string
    }
    setNumber(_number:number) {
        this.number.string=""+_number
    }

    // update (dt) {}
}
