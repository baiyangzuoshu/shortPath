// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    item:cc.Prefab=null
    @property(cc.Node)
    content:cc.Node=null

    _array:Array<cc.Node>=[]
    _openPath:Array<cc.Node>=[]
    _closePath:Array<cc.Node>=[]
    _endPoint:cc.Vec2=new cc.Vec2(0,0)
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadItem()
        this.scheduleOnce(()=>{
            this.searchPath(new cc.Vec2(0,0),new cc.Vec2(5,5))
        },5)

        this.schedule(()=>{
            if(0==this._openPath.length)return
            this.traversalItem4Point()
        },2)
    }

    isExitClosePath(p:cc.Vec2):boolean{
        for(let i=0;i<this._closePath.length;i++)
        {
            let ts=this._closePath[i].getComponent("item")
            if(ts.isEqual(p))
            {
                return true
            }
        }
        return false
    }

    isExitOpenPath(p:cc.Vec2):boolean{
        for(let i=0;i<this._openPath.length;i++)
        {
            let ts=this._openPath[i].getComponent("item")
            if(ts.isEqual(p))
            {
                return true
            }
        }
        return false
    }

    getItemByPoint(p:cc.Vec2):cc.Node{
        for(let i=0;i<this._array.length;i++)
        {
            let ts=this._array[i].getComponent("item")
            if(ts.isEqual(p)){
                return this._array[i]
            }
        }

        return null
    }

    loadItem(){
        for(let i=0;i<10;i++)
        {
            for(let j=0;j<10;j++)
            {
                let node=cc.instantiate(this.item)
                node.parent=this.content
                let ts=node.getComponent("item")
                ts.setNumber(i*10+j)
                ts.setXAndY(i,j)

                node.x=i*60
                node.y=j*60

                this._array.push(node)
            }
        }
    }

    traversalItem4Point(){
        let item=this._openPath.shift()
        this._closePath.push(item)

        let ts=item.getComponent("item")
        let itemPoint=ts.getXAndY()
        console.log(ts.getNumber(),this._openPath.length,this._closePath.length)

        for(let i=0;i<4;i++)
        {
            let p=new cc.Vec2(itemPoint.x,itemPoint.y)

            if(0==i)
            {
                p.x-=1
            }
            else if(1==i)
            {
                p.x+=1
            }
            else if(2==i)
            {
                p.y-=1
            }
            else if(3==i)
            {
                p.y+=1
            }

            if(this.isExitClosePath(p)||this.isExitOpenPath(p))
                continue

            let findItem=this.getItemByPoint(p)
            if(findItem)
            {
                let ts=findItem.getComponent("item")
                if(ts.isEqual(new cc.Vec2(this._endPoint.x,this._endPoint.y)))
                {
                    let ts=findItem.getComponent("item")
                    ts.setItemColor(new cc.Color(255,0,0,255))
                    this._openPath=[]
                    break
                }
                else{
                    let ts=findItem.getComponent("item")
                    ts.setItemColor(new cc.Color(0,255,0,255))
                    this._openPath.push(findItem)
                }
            }
        }
    }

    //遍历找到终点
    searchPath(start:cc.Vec2,end:cc.Vec2) {
        this._endPoint.x=end.x
        this._endPoint.y=end.y

        let startItem=this.getItemByPoint(start)
        let ts=startItem.getComponent("item")
        ts.setItemColor(new cc.Color(255,0,0,255))
        this._openPath.push(startItem)
    }
    //起始点，走step到达的点
    searchPath2(start:cc.Vec2,step:number){

    }

    // update (dt) {}
}
