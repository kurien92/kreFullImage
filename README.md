# kreFullImage
이미지를 크게 보기 어려운 모바일 환경에서 최대한 큰 사이즈로 화면에 보여주기 위한 플러그인입니다.   
단순히 전체화면 크기로 보여주는 것이 아니라 스크롤이 생기면서 가장 크게 보여줄 수 있도록 구현되었습니다.

## Update
**Ver 0.2**
* README 문서 작성
* fullImage.fullSize(imgSelector); 기능 추가
* fullImage.originSize(imgSelector); 기능 추가
* init, destroy, start, stop 기능을 용도에 맞게 수정

**Ver 0.1**
* 최초 기능 구현

## API
### kreFullImage(options)

```
var fullImage = kreFullImage({
	targets: "#images",
	imageWrapClass: "fullImageWrap",
	fullSizeActiveClass: "fullImageWrapActive",
	event: {
		initFullImage: function() {
			console.log("initFullImage event");
		},
		destroyFullImage: function() {
			console.log("destroyFullImage event");
		},
		startFullImage: function() {
			console.log("startFullImage event");
		},
		stopFullImage: function() {
			console.log("stopFullImage event");
		},
		afterFullSize: function(_this) {
			console.log("afterFullSize event", _this);
		},
		beforeFullSize: function(_this) {
			console.log("beforeFullSize event", _this);
		},
		beforeOriginSize: function(_this) {
			console.log("beforeOriginSize event", _this);
		},
		afterOriginSize: function(_this) {
			console.log("afterOriginSize event", _this);
		},
		resizedFullSize: function(activeClass) {
			console.log("resizedFullSize event", activeClass);
		}
	}
}).start();
```

* ```targets: String, Default("#images")```  cssSelector 하위에 위치한 img 태그가 대상이 됩니다.
* ```imageWrapClass: String, Default("fullImageWrap")``` 대상이 되는 img 태그를 감싸주는 div 태그에 해당하는 class명을 지정합니다.
* ```fullSizeActiveClass: String, Default("fullImageWrap")``` 대상이 되는 img가 활성화 되었을 때 img 태그를 감싸는 div 태그에 class를 지정합니다.
* ```event.initFullImage: Function()``` kreFullImage(options)가 시작된 후 이벤트가 발생합니다.
* ```event.destroyFullImage: Function()``` kreFullImage가 destroy 되기 전에 이벤트가 발생합니다.
* ```event.startFullImage: Function()``` kreFullImage가 시작된 후 이벤트가 발생합니다.
* ```event.stopFullImage: Function()``` kreFullImage가 중지되기 전 이벤트가 발생합니다.
* ```event.afterFullSize: Function(_this)``` 이미지가 최대화 되기 전 이벤트가 발생합니다.
* ```event.beforeFullSize: Function(_this)``` 이미지가 최대화 된 후 이벤트가 발생합니다.
* ```event.beforeOriginSize: Function(_this)``` 이미지가 원래 상태로 돌아오기 전 이벤트가 발생합니다.
* ```event.afterOriginSize: Function(_this)``` 이미지가 원래 상태로 돌아온 후 이벤트가 발생합니다.
* ```event.resizedFullSize: Function(activeClass)``` 이미지가 fullSize된 상태에서 화면 갱신이 일어난 후 발생합니다.

### fullImage.start();
```
img 클릭 시 size가 toggle되는 기능을 시작한다.
```
### fullImage.stop();
```
img 클릭 시 size가 toggle되는 기능을 중지한다.
```
### fullImage.destroy();
```
${targets}의 하위에 위치한 img 태그를 감싸는 div.${imageWrapClass} 태그를 제거한다.
```
### fullImage.fullSize(imgSelector);
```
imgSelector에 해당하는 이미지가 최대화된다.
imgSelector에 해당하는 element가 여러개라면 가장 첫번째의 element만 적용된다.
```
### fullImage.originSize(imgSelector);
```
imgSelector에 해당하는 이미지가 원래의 크기로 변한다.
imgSelector에 해당하는 element가 여러개라면 가장 첫번째의 element만 적용된다.
```
