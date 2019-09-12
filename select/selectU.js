

(function(win, document) {
	//构造器
	function unitSelect(config) {
		this.unitSelect;
		this.init(config);
		this.ensureBtn = this.unitSelect.querySelector('.ensure');
        this.cancelBtn = this.unitSelect.querySelector('.cancel');
        this.callback  = config.callback ? config.callback : function(){};
		this.wheels = this.unitSelect.querySelector('.wheels');
		this.cells = this.unitSelect.querySelectorAll(".unit-cell");
		console.log(this.cells)
		this.grayLayer = this.unitSelect.querySelector('.maskLayer');
		this.popUp = this.unitSelect.querySelector('.content');
		this.trigger = document.querySelector(config.trigger);
		this.trigger.style.cursor = 'pointer';
		this.selectData = [];
		this.observer();
		//按钮监听
	}

	unitSelect.prototype = {
		constructor: unitSelect,
		init: function(config) {
			var cancelText = config.cancelBtnText ? config.cancelBtnText : '取消';
			var ensureText = config.ensureBtnText ? config.ensureBtnText : '确认';
			this.unitSelect = document.createElement('div');
			this.unitSelect.className = 'unitSelect';
			this.unitSelect.innerHTML =
				'<div class="maskLayer"></div>' +
				'<div class="content">' +
				'<div class="btnBar">' +
				'<div class="fixWidth">' +
				'<div class="cancel">' +
				cancelText +
				'</div>' +
				'<div class="title"></div>' +
				'<div class="ensure">' +
				ensureText +
				'</div>' +
				'</div>' +
				'</div>' +
				'<div class="panel">' +
				'<div class="fixWidth">' +
				'<div class="wheels">' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>';
			document.body.appendChild(this.unitSelect);
			var data = config.data;
			var tempHTML = `
                <div class="unit-cell" data-index="1" data-status="false"><img src="./image/unselect.png" class="checkImg">${data[0]}</div>
                <div class="unit-cell" data-index="2" data-status="false"><img src="./image/unselect.png" class="checkImg">${data[1]}</div>
                <div class="unit-cell" data-index="3" data-status="false"><img src="./image/unselect.png" class="checkImg">${data[2]}</div>
            `;
			this.unitSelect.querySelector('.wheels').innerHTML = tempHTML;
		},
		show:function () {
			this.unitSelect.classList.add('unitSelect-show');
		},
		hide:function(){

		},
		observer: function() {
			var self = this;

			this.cancelBtn.addEventListener('click', function() {
				self.unitSelect.classList.remove('unitSelect-show');
			});

			var temp = Array.prototype.slice.call(this.cells);
			temp.forEach(element => {
				element.addEventListener('click',function (event) {
					var target = event.target,
					status = target.getAttribute('data-status'),
                    img = event.target.querySelector('.checkImg');
                    var con = target.textContent|| target.innerText;
                    
				if (target) {
					if (status == 'false') {
						img.setAttribute('src', './image/select.png');
                        target.setAttribute('data-status', 'true');
                        self.selectData.push(con);
					} else {
						img.setAttribute('src', './image/unselect.png');
                        target.setAttribute('data-status', 'false');
                        self.selectData = self.selectData.filter(function(item) {
                                return item != con
                         });
					}
				}
				})
			});

			// this.cells.addEventListener('click', function(event) {
			// 	var target = event.target,
			// 		status = target.getAttribute('data-status'),
            //         img = event.target.querySelector('.checkImg');
            //         var con = target.textContent|| target.innerText;
                    
			// 	if (target) {
			// 		if (status == 'false') {
			// 			img.setAttribute('src', '../image/select.png');
            //             target.setAttribute('data-status', 'true');
            //             self.selectData.push(con);
			// 		} else {
			// 			img.setAttribute('src', '../image/unselect.png');
            //             target.setAttribute('data-status', 'false');
            //             self.selectData = self.selectData.filter(function(item) {
            //                     return item != con
            //              });
			// 		}
			// 	}
			// });

            // 点击确定按钮
			this.ensureBtn.addEventListener('click', function() {
				self.unitSelect.classList.remove('unitSelect-show');
				var data = ""
				data = self.selectData.join(',');
				if(!self.selectData.length){
                    data = "请选择"
				}
				self.callback(data);
			});
			// this.trigger.addEventListener('click', function() {
			// 	self.unitSelect.classList.add('unitSelect-show');
			// });
			this.grayLayer.addEventListener('click', function() {
				self.unitSelect.classList.remove('unitSelect-show');
			});
			this.popUp.addEventListener('click', function() {
				event.stopPropagation();
			});
		}
	};

	win.unitSelect = unitSelect;
})(window, document);
