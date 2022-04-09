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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for(let i=0;i<10;i++)
        {
            for(let j=0;j<10;j++)
            {
                let node=cc.instantiate(this.item)
                node.parent=this.content
                let ts=node.getComponent("item")
                ts.setNumber(i*10+j)

                node.x=i*60
                node.y=j*60
            }
        }
    }

    start () {

    }

    // update (dt) {}
}
