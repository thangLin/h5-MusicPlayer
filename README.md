# h5-MusicPlayer 
         
一 --   

应用技术： 
 1 Html5 -- 
         媒体- audio 
         动画- requesetAnimationFrame
         canvas
 2  图片预加载  
 3 对象池
 4 代理模式
 5 移动端touch事件
 6 zepto 
 7 ajxax （动态添加）
 8 web worker  (处理计算gauss模糊问题)
 9 总体来说，该音乐项目使用了 一个大的组合模式 （比较像宏命令）


二   ---

流程图  （根据自身代码）

组合对象结构--

顶层   --   （1） btnController （顶层控件）


第二层 --  （10）AudioPlayer（控制音乐的对象、播放时间）     （父级对象的audio属性）  
          （11）timeSpan    （显示右侧歌曲总时长）         （父级timeSpanObj属性）
          （12）likeBtn     (点击喜欢的点击按钮)           （父级likeBtnObj属性）
                                                               

第三层 --  （101）audio       （new audio）  （父级audio属性）  （这里和上面都命名audio，以后得注意这种事。）
           (101) playBtn      (点击播放暂停按钮) （父级sonPlay属性）      
          （102）progressBar （滑动进度条，改变播放状态和播放时间） （父级progressBar属性）
                        
  
第四层 --（1020）leftTimeSpan  （左边显示播放时间的span）   （父级timeDom属性）
        （1021）progressBarDom （控制进度条--一个原生dom）  （父级barDom属性）
                                                                 

（解释：1020 项为 102 项的子组件，102为10子组件， 其它同理）                                                                        

大概流程图如此，我使用面向对象的方式，对项目的整体进行构建，交互、点击事件于一个对象。


三 -----
开发感想
模式类的书籍很有用，对自己js方面的帮助很大，让一个项目没有bug ，其实不要急着写代码，
要至少在开发前，在自己头脑中构建一个结构图，谁控制谁，某一个dom和另外的dom之间的联系，
这样有图纸似的开发，会让自己事半功倍。

这次的播放器，让我想起了react，一个顶层的东西一改变，子组件随之更替。


写完代码  对以后的维护有很大的帮助，代码没有写死，以后万一有什么问题，还可以通过一些修改，
改善问题。












