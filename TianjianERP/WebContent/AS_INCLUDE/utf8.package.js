/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/*
 * Simplified Chinese translation
 * By DavidHu
 * 09 April 2007
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">加载中...</div>';

if(Ext.View){
   Ext.View.prototype.emptyText = "";
}

if(Ext.grid.GridPanel){
   Ext.grid.GridPanel.prototype.ddText = "{0} 选择行";
}

if(Ext.TabPanelItem){
   Ext.TabPanelItem.prototype.closeText = "关闭";
}

if(Ext.form.Field){
   Ext.form.Field.prototype.invalidText = "输入值非法";
}

Date.monthNames = [
   "一月",
   "二月",
   "三月",
   "四月",
   "五月",
   "六月",
   "七月",
   "八月",
   "九月",
   "十月",
   "十一月",
   "十二月"
];

Date.dayNames = [
   "日",
   "一",
   "二",
   "三",
   "四",
   "五",
   "六"
];

if(Ext.MessageBox){
   Ext.MessageBox.buttonText = {
      ok     : "确定",
      cancel : "取消",
      yes    : "是",
      no     : "否"
   };
}

if(Ext.util.Format){
   Ext.util.Format.date = function(v, format){
      if(!v) return "";
      if(!(v instanceof Date)) v = new Date(Date.parse(v));
      return v.dateFormat(format || "y年m月d日");
   };
}

if(Ext.DatePicker){
   Ext.apply(Ext.DatePicker.prototype, {
      todayText         : "今天",
      minText           : "日期在最小日期之前",
      maxText           : "日期在最大日期之后",
      disabledDaysText  : "",
      disabledDatesText : "",
      monthNames        : Date.monthNames,
      dayNames          : Date.dayNames,
      nextText          : '下月 (Control+Right)',
      prevText          : '上月 (Control+Left)',
      monthYearText     : '选择一个月 (Control+Up/Down 来改变年)',
      todayTip          : "{0} (空格键选择)",
      format            : "y年m月d日",
      okText            : "确定",
      cancelText        : "取消"
   });
}

if(Ext.PagingToolbar){
   Ext.apply(Ext.PagingToolbar.prototype, {
      beforePageText : "页",
      afterPageText  : "页共 {0} 页",
      firstText      : "第一页",
      prevText       : "前一页",
      nextText       : "下一页",
      lastText       : "最后页",
      refreshText    : "刷新",
      displayMsg     : "显示 {0} - {1}，共 {2} 条",
      emptyMsg       : '没有数据需要显示'
   });
}

if(Ext.form.TextField){
   Ext.apply(Ext.form.TextField.prototype, {
      minLengthText : "该输入项的最小长度是 {0}",
      maxLengthText : "该输入项的最大长度是 {0}",
      blankText     : "该输入项为必输项",
      regexText     : "",
      emptyText     : null
   });
}

if(Ext.form.NumberField){
   Ext.apply(Ext.form.NumberField.prototype, {
      minText : "该输入项的最小值是 {0}",
      maxText : "该输入项的最大值是 {0}",
      nanText : "{0} 不是有效数值"
   });
}

if(Ext.form.DateField){
   Ext.apply(Ext.form.DateField.prototype, {
      disabledDaysText  : "禁用",
      disabledDatesText : "禁用",
      minText           : "该输入项的日期必须在 {0} 之后",
      maxText           : "该输入项的日期必须在 {0} 之前",
      invalidText       : "{0} 是无效的日期 - 必须符合格式： {1}",
      format            : "y年m月d日"
   });
}

if(Ext.form.ComboBox){
   Ext.apply(Ext.form.ComboBox.prototype, {
      loadingText       : "加载...",
      valueNotFoundText : undefined
   });
}

if(Ext.form.VTypes){
   Ext.apply(Ext.form.VTypes, {
      emailText    : '该输入项必须是电子邮件地址，格式如： "user@example.com"',
      urlText      : '该输入项必须是URL地址，格式如： "http:/'+'/www.example.com"',
      alphaText    : '该输入项只能包含字符和_',
      alphanumText : '该输入项只能包含字符,数字和_'
   });
}

if(Ext.grid.GridView){
   Ext.apply(Ext.grid.GridView.prototype, {
      sortAscText  : "正序",
      sortDescText : "逆序",
      lockText     : "锁列",
      unlockText   : "解锁列",
      columnsText  : "列"
   });
}

if(Ext.grid.PropertyColumnModel){
   Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
      nameText   : "名称",
      valueText  : "值",
      dateFormat : "y年m月d日"
   });
}

if(Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion){
   Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
      splitTip            : "拖动来改变尺寸.",
      collapsibleSplitTip : "拖动来改变尺寸. 双击隐藏."
   });
}
/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.grid');

/**
 * @class Ext.ux.grid.RowExpander
 * @extends Ext.util.Observable
 * Plugin (ptype = 'rowexpander') that adds the ability to have a Column in a grid which enables
 * a second row body which expands/contracts.  The expand/contract behavior is configurable to react
 * on clicking of the column, double click of the row, and/or hitting enter while a row is selected.
 *
 * @ptype rowexpander
 */
Ext.ux.grid.RowExpander = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Boolean} expandOnEnter
     * <tt>true</tt> to toggle selected row(s) between expanded/collapsed when the enter
     * key is pressed (defaults to <tt>true</tt>).
     */
    expandOnEnter : true,
    /**
     * @cfg {Boolean} expandOnDblClick
     * <tt>true</tt> to toggle a row between expanded/collapsed when double clicked
     * (defaults to <tt>true</tt>).
     */
    expandOnDblClick : true,

    header : '',
    width : 20,
    sortable : false,
    fixed : true,
    menuDisabled : true,
    dataIndex : '',
    id : 'expander',
    lazyRender : true,
    enableCaching : true,

    constructor: function(config){
        Ext.apply(this, config);

        this.addEvents({
            /**
             * @event beforeexpand
             * Fires before the row expands. Have the listener return false to prevent the row from expanding.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforeexpand: true,
            /**
             * @event expand
             * Fires after the row expands.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            expand: true,
            /**
             * @event beforecollapse
             * Fires before the row collapses. Have the listener return false to prevent the row from collapsing.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            beforecollapse: true,
            /**
             * @event collapse
             * Fires after the row collapses.
             * @param {Object} this RowExpander object.
             * @param {Object} Ext.data.Record Record for the selected row.
             * @param {Object} body body element for the secondary row.
             * @param {Number} rowIndex The current row index.
             */
            collapse: true
        });

        Ext.ux.grid.RowExpander.superclass.constructor.call(this);

        if(this.tpl){
            if(typeof this.tpl == 'string'){
                this.tpl = new Ext.Template(this.tpl);
            }
            this.tpl.compile();
        }

        this.state = {};
        this.bodyContent = {};
    },

    getRowClass : function(record, rowIndex, p, ds){
        p.cols = p.cols-1;
        var content = this.bodyContent[record.id];
        if(!content && !this.lazyRender){
            content = this.getBodyContent(record, rowIndex);
        }
        if(content){
            p.body = content;
        }
        return this.state[record.id] ? 'x-grid3-row-expanded' : 'x-grid3-row-collapsed';
    },

    init : function(grid){
        this.grid = grid;

        var view = grid.getView();
        view.getRowClass = this.getRowClass.createDelegate(this);

        view.enableRowBody = true;


        grid.on('render', this.onRender, this);
        grid.on('destroy', this.onDestroy, this);
    },

    // @private
    onRender: function() {
        var grid = this.grid;
        var mainBody = grid.getView().mainBody;
        mainBody.on('mousedown', this.onMouseDown, this, {delegate: '.x-grid3-row-expander'});
        if (this.expandOnEnter) {
            this.keyNav = new Ext.KeyNav(this.grid.getGridEl(), {
                'enter' : this.onEnter,
                scope: this
            });
        }
        if (this.expandOnDblClick) {
            grid.on('rowdblclick', this.onRowDblClick, this);
        }
    },
    
    // @private    
    onDestroy: function() {
        this.keyNav.disable();
        delete this.keyNav;
        var mainBody = this.grid.getView().mainBody;
        mainBody.un('mousedown', this.onMouseDown, this);
    },
    // @private
    onRowDblClick: function(grid, rowIdx, e) {
        this.toggleRow(rowIdx);
    },

    onEnter: function(e) {
        var g = this.grid;
        var sm = g.getSelectionModel();
        var sels = sm.getSelections();
        for (var i = 0, len = sels.length; i < len; i++) {
            var rowIdx = g.getStore().indexOf(sels[i]);
            this.toggleRow(rowIdx);
        }
    },

    getBodyContent : function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(!content){
            content = this.tpl.apply(record.data);
            this.bodyContent[record.id] = content;
        }
        return content;
    },

    onMouseDown : function(e, t){
        e.stopEvent();
        var row = e.getTarget('.x-grid3-row');
        this.toggleRow(row);
    },

    renderer : function(v, p, record){
        p.cellAttr = 'rowspan="2"';
        return '<div class="x-grid3-row-expander">&#160;</div>';
    },

    beforeExpand : function(record, body, rowIndex){
        if(this.fireEvent('beforeexpand', this, record, body, rowIndex) !== false){
            if(this.tpl && this.lazyRender){
                body.innerHTML = this.getBodyContent(record, rowIndex);
            }
            return true;
        }else{
            return false;
        }
    },

    toggleRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        this[Ext.fly(row).hasClass('x-grid3-row-collapsed') ? 'expandRow' : 'collapseRow'](row);
    },

    expandRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.DomQuery.selectNode('tr:nth(2) div.x-grid3-row-body', row);
        if(this.beforeExpand(record, body, row.rowIndex)){
            this.state[record.id] = true;
            Ext.fly(row).replaceClass('x-grid3-row-collapsed', 'x-grid3-row-expanded');
            this.fireEvent('expand', this, record, body, row.rowIndex);
        }
    },

    collapseRow : function(row){
        if(typeof row == 'number'){
            row = this.grid.view.getRow(row);
        }
        var record = this.grid.store.getAt(row.rowIndex);
        var body = Ext.fly(row).child('tr:nth(1) div.x-grid3-row-body', true);
        if(this.fireEvent('beforecollapse', this, record, body, row.rowIndex) !== false){
            this.state[record.id] = false;
            Ext.fly(row).replaceClass('x-grid3-row-expanded', 'x-grid3-row-collapsed');
            this.fireEvent('collapse', this, record, body, row.rowIndex);
        }
    }
});

Ext.preg('rowexpander', Ext.ux.grid.RowExpander);

//backwards compat
Ext.grid.RowExpander = Ext.ux.grid.RowExpander;﻿Ext.namespace("Ext.ux.grid");

Ext.ux.grid.MultiCellSelectionModel = function(config) {
    Ext.apply(this, config);
    this.addEvents({
        "beforecellselect": true,
        "selectionchange": true
    });
    var ck = this.cellKey;
    this.selection = new Ext.util.MixedCollection(false, function(o){
        return ck(o);
    });
    Ext.ux.grid.MultiCellSelectionModel.superclass.constructor.call(this);
}
Ext.extend(Ext.ux.grid.MultiCellSelectionModel, Ext.grid.AbstractSelectionModel, {
    constrainToSingleRow: false,
	nonceRow : false,
	witCopy : true,
    unselectableColumns: [],
	dragFlag : false,
    returnRecord: true,
    returnDataIndex: true,
    keyNavEnabled: false,
	selectedArea:"",
    initEvents: function() {
		this.keyBy(this);
        this.grid.on("cellmousedown", this.handleMouseDown, this);
        this.view = this.grid.view;

        this.view.on("beforerowremoved", this.clearSelections, this);
        this.view.on("beforerowsinserted", this.clearSelections, this);

        if(this.grid.isEditor)
            this.grid.on("beforeedit", this.beforeEdit,  this);

        var moveSelectionFunc = function(adjust) {
            return function(e) {
                if(this._activeItem) {
                    var active = this.selection.get(this._activeItem);
                    var row = active.row, col = active.col;

                    if(this._expandedTo) {  // e.shiftKey && 
                        row = this._expandedTo[0];
                        col = this._expandedTo[1];
                    }
                    var adjusted = adjust(row,col);
                    row = adjusted[0]; col = adjusted[1];
                    if(this.isCellAvailable(row,col) && this.isCellSelectable(row,col,this.getColumnDataIndex(col))) {
                        e.shiftKey ? this.expandSelection(row, col, true) : this.select(row, col, false);
                    }
                }
            }
        };

        if(this.keyNavEnabled) {
            this.keyNav = new Ext.KeyNav(this.grid.getGridEl(), {
                scope: this,
                up: moveSelectionFunc(function(row, col) {    return [row - 1, col     ]; }),
                down: moveSelectionFunc(function(row, col) {  return [row + 1, col     ]; }),
                left: moveSelectionFunc(function(row, col) {  return [row    , col - 1 ]; }),
                right: moveSelectionFunc(function(row, col) { return [row    , col + 1 ]; }),
                "enter": function(e) {
                    if(this._activeItem) {
                        var active = this.selection.get(this._activeItem), g = this.grid;
                        if(g.isEditor && !g.editing) {
                            g.startEditing(active.row, active.col);
                            e.stopEvent();
                        }
                    }
                }
            })
        }
    },
    isCellAvailable: function(row, col) {
        return col > -1 && row > -1 && !!this.view.getRow(row) && !!this.view.getCell(row,col);
    },
    beforeEdit: function() {

    },
    hasSelection: function() {
        return this.selection.getCount() > 0;
    },
    clearSelections: function(preventNotify) {
        if(this.hasSelection()) {
            if(!preventNotify)
                this.selection.each(function(cell){
					if(this.nonceRow){
						var cm=this.grid.getColumnModel();
						var c=cm.getColumnCount();
						for(var i=0;i<c;i++){
							if(typeof cm.getColumnById(cm.getColumnId(i)).hidden=="undefined"||!cm.getColumnById(cm.getColumnId(i)).hidden){
								this.view.onCellDeselect(cell.row, i);	
							}
						}
					}else{
                    	this.view.onCellDeselect(cell.row, cell.col);
					}
                }, this);
            this.selection.clear();
            this.fireEvent("selectionchange", this, this.selection);
        }
		//this.selectedArea = "";
    },
    handleMouseDown: function(g, row, col, e) {
        if(e.button != 0 || this.isLocked()) return;
        var hs = this.hasSelection();
        if(hs) {
            if(e.shiftKey) this.expandSelection(row, col, true);
            else if(e.ctrlKey) this.selectAdditionalCell(row,col,e);
            else this.select(row, col);
        } else this.select(row, col, e);
    },
    captureMouseMove: function(on) {
        if(on) {
            this.view.el.on('mouseup', this.captureMouseMove.createDelegate(this, [false]), this, { single: true });
            this.view.el.on('mousemove', this.onMouseMove, this);
        } else {
            this.view.el.un('mousemove', this.onMouseMove);
            this.fireEvent("selectionchange", this, this.selection);      
        }
    },
    onMouseMove: function(e, el) {
		if(this.dragFlag) {
			var row = this.view.findRowIndex(el), col = this.view.findCellIndex(el);
			if(!(col === false) && (!this._expandedTo || !(row == this._expandedTo[0] && col == this._expandedTo[1]))) {
				this.expandSelection(row, col, true);
			}
		}
    },
    isCellSelectable: function(row, col, dataIndex) {
        return (!this.grid.getColumnModel().isHidden(col)) && !(dataIndex && this.unselectableColumns.indexOf(dataIndex) != -1);

    },
    getColumnDataIndex: function(col) {
        if(this.returnDataIndex) {
            var cm = this.grid.getColumnModel();
            return cm.getColumnById(cm.getColumnId(col)).dataIndex;
        }
    },
    selectCell: function(row, col, preventViewNotify, preventFocus, r) {
		var key = this.cellKey(row, col);
		var v = this.grid.getView();
		if(this.nonceRow){
			var cm=this.grid.getColumnModel();
			var c=cm.getColumnCount();
			for(var i=0;i<c;i++){
				if(typeof cm.getColumnById(cm.getColumnId(i)).hidden=="undefined"||!cm.getColumnById(cm.getColumnId(i)).hidden){
					var dataIndex = this.getColumnDataIndex(col);
					r = this.returnRecord && (r || this.grid.store.getAt(row));
					var sel = {
						record : r,
						dataIndex: dataIndex,
						cell : [row, i],
						row: row, col: i
					};
					this.selection.add(key, sel);
					if(!preventViewNotify){
						v.onCellSelect(row, i);
						if(preventFocus !== true){
							v.focusCell(row, col);
						}
					}	
				}
			}
		}else{
			var dataIndex = this.getColumnDataIndex(col);
			if(!this.isCellSelectable(row, col, dataIndex)) return;
	
			r = this.returnRecord && (r || this.grid.store.getAt(row));
			var sel = {
				record : r,
				dataIndex: dataIndex,
				cell : [row, col],
				row: row, col: col
			};
			this.selection.add(key, sel);
			if(!preventViewNotify){
				v.onCellSelect(row, col);
				if(preventFocus !== true){
					v.focusCell(row, col);
				}
			}
		}
			
        return key;
    },
    deselectCellByKey: function(cellkey, preventViewNotify) {
			var cell = this.selection.get(cellkey);
			if(!cell) return;
			if(!preventViewNotify) this.view.onCellDeselect(cell.row, cell.col);
			this.selection.remove(cell);
    },
    deselectCell: function(row, col) {
        this.deselectCellByKey(this.cellKey(row, col));
    },
    deselectCells: function(cells) {
        for(var i=0; i<cells.length;i++)
            this.deselectCellByKey(cells[i]);
    },
    cellKey: function(row,col) {
        return String.format("{0}::{1}", row, col);
    },
    expandSelection: function(row, col, clearExpandedSelection) {
        if(this._expandedSelection && clearExpandedSelection) {
				if(!this.nonceRow)
            	this.deselectCells(this._expandedSelection);
        }
        var active = this.selection.get(this._activeItem);
        this._expandedSelection = [];
		
		//if(this.nonceRow){
        //    var s = this.selectCell(active.row, 0, false, true);
        //   this._expandedSelection.push(s);
        //    this._expandedTo = [active.row, 0];
		//}else 
		if(this.constrainToSingleRow || active.row == row) {
            var start = active.col + 1, end = col;
            if(col < active.col) {
                start = col;
                end = active.col -1;
            }
            for(var i = start; i <= end; i++) {
                var s = this.selectCell(active.row, i, false, true);
                this._expandedSelection.push(s);
            }
            this._expandedTo = [active.row, col];
        } else {
            var x0 = Math.min(col, active.col), x1 = Math.max(col, active.col);
            var y0 = Math.min(row, active.row), y1 = Math.max(row, active.row);
            for(var x=x0; x<=x1; x++) {
                for(var y=y0; y<=y1;y++) {
                    if(!(x==active.col && y==active.row)) {
                        var s = this.selectCell(y, x, false, true);
                        this._expandedSelection.push(s);
                    }
                }
            }
            this._expandedTo = [row, col];
        }
        this.fireEvent("selectionchange", this, this.selection);
    },
    getSelections: function() {
        return this.selection;
    },
    selectAdditionalCell: function(row, col, captureMouseMove,e) {
		this.dragFlag = false;
        var key = this.cellKey(row, col);
        if(this.constrainToSingleRow && this._activeItem) {
            var active = this.selection.get(this._activeItem);
            if(active.row != row) return;
        }
        if(this.selection.containsKey(key)) {
            this.deselectCellByKey(key);
        } else {
            this._activeItem = this.selectCell(row, col);
            this._expandedSelection = false;
            this._expandedTo = false;

            if(captureMouseMove !== false) {
                this.captureMouseMove(true);
			}
        }
    },
    select : function(rowIndex, colIndex, e, captureMouseMove, preventViewNotify, preventFocus, /*internal*/ r){
        if(this.fireEvent("beforecellselect", this, rowIndex, colIndex) !== false){
            this.clearSelections();
            this._activeItem = this.selectCell(rowIndex, colIndex, preventViewNotify, preventFocus, r);
            this._expandedSelection = false;
            this._expandedTo = false;
            if(captureMouseMove !== false) {
                this.captureMouseMove(true);
		
					this.dragFlag = true;
				
			}
			//alert(rowIndex + "==" + colIndex);
            this.fireEvent("selectionchange", this, this.selection);
        }
    },
	 keyBy : function(o) {
		var m = new Ext.KeyMap(Ext.get(this.grid.getEl().id), {
			key: 'c',
			fn: function(){mcsm_copy_(o)},
			ctrl:true
		});
	},
	copys : function(type){
		mcsm_copy_(this,type);
	},
	calculate : function(o) {
		mcsm_calculate(this);
	}
});

function mcsm_calculate(obj) {
	//alert(1);
	//验证货币类型的正则表达式
	var re = RegExp(/^([1-9,-]{1}[0-9,-]{0,2}(\,[0-9,-]{3})*(\.[0-9,-]{0,2})?|[1-9,-]{1}\d*(\.[0-9,-]{0,2})?|0(\.[0-9,-]{0,2})?|(\.[0-9,-]{1,2})?)$/);
	
	var r=obj.grid.getStore().getCount();
	var cm=obj.grid.getColumnModel();
	var c=cm.getColumnCount();
	var selectedArea = obj.selectedArea;
	var h=0;
	var f=0;
	var n=0;
	var m=0;
	var calculateDiv = document.getElementById("sText");
	for(var j=0;j<r;j++){
		n=0;
		m=0;

		for(var i=0;i<c;i++){
			try{
				var o=obj.grid.view.getCell(j,i);
				if(typeof cm.getColumnById(cm.getColumnId(i)).hidden!="undefined"&&cm.getColumnById(cm.getColumnId(i)).hidden){
				}else{
					if(Ext.fly(o).hasClass("x-grid3-cell-selected")){
						var textValue = o.firstChild.innerText;
						
						
						if(obj.selectedArea.indexOf("[" + j + "," + i + "]")<0) {
							//判断选中的值是否是货币,如果不是就直接返回
							if(( re.test(textValue))||( textValue.substring(0,1) == "-" && re.test(textValue.substring(1)))||( textValue.substring(0,1) == "(" && re.test(textValue.substring(1,textValue.length-1))) ) {
								
								if(textValue.indexOf("-") == 0) {
									textValue = "(" + textValue +")";
								} 
								if(calculateDiv.value=="") {
									calculateDiv.value += textValue;
								} else {
									calculateDiv.value += " + " + textValue;
								}
							} 
							obj.selectedArea += "[" + j + "," + i + "],";
						}

						

						/*
						if(textValue.indexOf("-")>-1) 
							textValue = " (" + textValue + ") ";
						}
						calculateDiv.value += textValue+"+"; 
						*/
						if(f==0&&h==0)
							f=i;
						h++;
						n++;
					}else{
						m++;	
					}
				}
			}catch(e){
			}
		}
	}
}
//private
function mcsm_copy_(obj,type){
	setTimeout(function(){
		var s="";
		var r=obj.grid.getStore().getCount();
		var cm=obj.grid.getColumnModel();
		var c=cm.getColumnCount();
		var copyArray = new Array(r+1);
		var noBlanks = ",";
		var cellIndexStr = "" ; //记录要添加表头的列
		
		
		for(var j=0;j<r;j++){
			for(var i=0;i<c;i++){
				try{
					var o=obj.grid.view.getCell(j,i);
					if(typeof cm.getColumnById(cm.getColumnId(i)).hidden!="undefined"&&cm.getColumnById(cm.getColumnId(i)).hidden){
					}else{
							if(Ext.fly(o).hasClass("x-grid3-cell-selected")){
								if(!copyArray[j]) {
									copyArray[j] = new Array(c);
								}
								copyArray[j][i] = o.firstChild.innerText.Trim();
								noBlanks += j + ","
								if(cellIndexStr.indexOf(i) == -1) {
									cellIndexStr += i + "," ;
								}
							}
						
					}
				}catch(e){}
				
			}
			
		}
		
		if(cellIndexStr != "") {
			cellIndexStr = cellIndexStr.substring(0,cellIndexStr.length-1) ;
		}
		if(type=="2" || type=="4") {  //带表头
			copyArray[0] = new Array(c);
			for(var k=0;k<c;k++) {
				if(cellIndexStr.indexOf(k)>-1) {
					var oHead = obj.grid.view.getHeaderCell(k);
						copyArray[0][k] = oHead.firstChild.innerText.Trim();
				}
				
			}
			noBlanks +=0+"," ;
		}
		var startCol = 99999;
		for(var i=0; i<r+1; i++) {
			var flag = 0;
			if(noBlanks.indexOf(","+i+",")>-1) {
				for(var j=0; j<c; j++) {
					if(typeof(copyArray[i][j])=="undefined") {
						flag +=1
					} else {
						break;	
					}
				}
				if(flag < startCol) {
					startCol = flag;
				}
			}
		}
		
		var sText = "";
		for(var i=0; i<r+1; i++) {
			if(noBlanks.indexOf(","+i+",")>-1) {
				for(var j=startCol;j<c;j++) {
					if(typeof(copyArray[i][j])=="undefined") {
				//		sText += "\t";
					} else {
						sText += copyArray[i][j] + "\t";
					}
				}
				sText = sText.substring(0,sText.length-1);
				sText += "\n"
			}
		}
		sText = sText.substring(0,sText.length-1);
		
		if(type=="3" || type=="4") { //转置复制
			sText = changeRowsAndCols(sText) ;
		}
		
		var AuditReport =  new ActiveXObject("AuditReportPoject.AuditReport");
		AuditReport.subClipboardSetText(sText);
		AuditReport=null;
		
	//	window.clipboardData.setData('text',sText);
		try {
			obj.grid.getSelectionModel().clearSelections();
		}
		catch (e) {
			
		}
	},0);
}

function changeRowsAndCols(text) {
	if(text!="") {
		var textArray = text.split("\n");
		var myarray = new Array(textArray.length);
		for(var i=0; i<myarray.length; i++) {
			var textArray1 = textArray[i].split("\t");
			myarray[i] = new Array(textArray1.length);
			for(var j=0; j<myarray[i].length; j++) {
				myarray[i][j] = textArray1[j];
			}
		}
	}
	
	var text_rows = myarray.length;
	var text_cols = myarray[text_rows-1].length;
	var newArray = new Array(text_cols);
	for(var i=0; i<newArray.length; i++) {
		newArray[i] = new Array();
	}
	
	for(var i=0; i<myarray.length; i++) {
		for(var j=0; j<myarray[i].length; j++) {
			try {
				newArray[j][i] = myarray[i][j];
			} catch(e) {
				alert(e);
			}
		}
	}
	
	var returnText = "";
	for(var i=0; i<newArray.length; i++) {
		for(var j=0; j<newArray[i].length; j++) {
			if(newArray[i][j]=="" || typeof(newArray[i][j])=="undefined") {
				returnText += "\t"
			} else {
				returnText += newArray[i][j] + "\t"
			}
		}
		returnText = returnText.substring(0,returnText.length-1);
		returnText += "\n";
	}
	returnText = returnText.substring(0,returnText.length-1);
	return returnText;
}/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns('Ext.ux.grid');

/**
 * @class Ext.ux.grid.BufferView
 * @extends Ext.grid.GridView
 * A custom GridView which renders rows on an as-needed basis.
 */
Ext.ux.grid.BufferView = Ext.extend(Ext.grid.GridView, {
	/**
	 * @cfg {Number} rowHeight
	 * The height of a row in the grid.
	 */
	rowHeight: 19,

	/**
	 * @cfg {Number} borderHeight
	 * The combined height of border-top and border-bottom of a row.
	 */
	borderHeight: 2,

	/**
	 * @cfg {Boolean/Number} scrollDelay
	 * The number of milliseconds before rendering rows out of the visible
	 * viewing area. Defaults to 100. Rows will render immediately with a config
	 * of false.
	 */
	scrollDelay: 100,

	/**
	 * @cfg {Number} cacheSize
	 * The number of rows to look forward and backwards from the currently viewable
	 * area.  The cache applies only to rows that have been rendered already.
	 */
	cacheSize: 20,

	/**
	 * @cfg {Number} cleanDelay
	 * The number of milliseconds to buffer cleaning of extra rows not in the
	 * cache.
	 */
	cleanDelay: 500,

	initTemplates : function(){
		Ext.ux.grid.BufferView.superclass.initTemplates.call(this);
		var ts = this.templates;
		// empty div to act as a place holder for a row
	        ts.rowHolder = new Ext.Template(
		        '<div class="x-grid3-row {alt}" style="{tstyle}"></div>'
		);
		ts.rowHolder.disableFormats = true;
		ts.rowHolder.compile();

		ts.rowBody = new Ext.Template(
		        '<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
			'<tbody><tr>{cells}</tr>',
			(this.enableRowBody ? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>' : ''),
			'</tbody></table>'
		);
		ts.rowBody.disableFormats = true;
		ts.rowBody.compile();
	},

	getStyleRowHeight : function(){
		return Ext.isBorderBox ? (this.rowHeight + this.borderHeight) : this.rowHeight;
	},

	getCalculatedRowHeight : function(){
		return this.rowHeight + this.borderHeight;
	},

	getVisibleRowCount : function(){
		try {
		var rh = this.getCalculatedRowHeight();
		var visibleHeight = this.scroller.dom.clientHeight;
		return (visibleHeight < 1) ? 0 : Math.ceil(visibleHeight / rh);
		}catch (e) {}
	},

	getVisibleRows: function(){
		var count = this.getVisibleRowCount();
		var sc = this.scroller.dom.scrollTop;
		var start = (sc == 0 ? 0 : Math.floor(sc/this.getCalculatedRowHeight())-1);
		return {
			first: Math.max(start, 0),
			last: Math.min(start + count + 2, this.ds.getCount()-1)
		};
	},

	doRender : function(cs, rs, ds, startRow, colCount, stripe, onlyBody){
		var ts = this.templates, ct = ts.cell, rt = ts.row, rb = ts.rowBody, last = colCount-1;
		var rh = this.getStyleRowHeight();
		var vr = this.getVisibleRows();
		var tstyle = 'width:'+this.getTotalWidth()+';height:'+rh+'px;';
		// buffers
		var buf = [], cb, c, p = {}, rp = {tstyle: tstyle}, r;
		for (var j = 0, len = rs.length; j < len; j++) {
			r = rs[j]; cb = [];
			var rowIndex = (j+startRow);
			var visible = rowIndex >= vr.first && rowIndex <= vr.last;
			if (visible) {
				for (var i = 0; i < colCount; i++) {
					c = cs[i];
					p.id = c.id;
					p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
					p.attr = p.cellAttr = "";
					p.value = c.renderer(r.data[c.name], p, r, rowIndex, i, ds);
					p.style = c.style;
					if (p.value == undefined || p.value === "") {
						p.value = "&#160;";
					}
					if (r.dirty && typeof r.modified[c.name] !== 'undefined') {
						p.css += ' x-grid3-dirty-cell';
					}
					cb[cb.length] = ct.apply(p);
				}
			}
			var alt = [];
			if(stripe && ((rowIndex+1) % 2 == 0)){
			    alt[0] = "x-grid3-row-alt";
			}
			if(r.dirty){
			    alt[1] = " x-grid3-dirty-row";
			}
			rp.cols = colCount;
			if(this.getRowClass){
			    alt[2] = this.getRowClass(r, rowIndex, rp, ds);
			}
			rp.alt = alt.join(" ");
			rp.cells = cb.join("");
			buf[buf.length] =  !visible ? ts.rowHolder.apply(rp) : (onlyBody ? rb.apply(rp) : rt.apply(rp));
		}
		return buf.join("");
	},

	isRowRendered: function(index){
		var row = this.getRow(index);
		return row && row.childNodes.length > 0;
	},

	syncScroll: function(){
		Ext.ux.grid.BufferView.superclass.syncScroll.apply(this, arguments);
		this.update();
	},

	// a (optionally) buffered method to update contents of gridview
	update: function(){
		if (this.scrollDelay) {
			if (!this.renderTask) {
				this.renderTask = new Ext.util.DelayedTask(this.doUpdate, this);
			}
			this.renderTask.delay(this.scrollDelay);
		}else{
			this.doUpdate();
		}
	},

	doUpdate: function(){
		if (this.getVisibleRowCount() > 0) {
			var g = this.grid, cm = g.colModel, ds = g.store;
		        var cs = this.getColumnData();

		        var vr = this.getVisibleRows();
			for (var i = vr.first; i <= vr.last; i++) {
				// if row is NOT rendered and is visible, render it
				if(!this.isRowRendered(i)){
					var html = this.doRender(cs, [ds.getAt(i)], ds, i, cm.getColumnCount(), g.stripeRows, true);
					this.getRow(i).innerHTML = html;
				}
			}
			this.clean();
		}
	},

	// a buffered method to clean rows
	clean : function(){
		if(!this.cleanTask){
			this.cleanTask = new Ext.util.DelayedTask(this.doClean, this);
		}
		this.cleanTask.delay(this.cleanDelay);
	},

	doClean: function(){
		if (this.getVisibleRowCount() > 0) {
			var vr = this.getVisibleRows();
			vr.first -= this.cacheSize;
			vr.last += this.cacheSize;

			var i = 0, rows = this.getRows();
			// if first is less than 0, all rows have been rendered
			// so lets clean the end...
			if(vr.first <= 0){
				i = vr.last + 1;
			}
			for(var len = this.ds.getCount(); i < len; i++){
				// if current row is outside of first and last and
				// has content, update the innerHTML to nothing
				if ((i < vr.first || i > vr.last) && rows[i].innerHTML) {
					rows[i].innerHTML = '';
				}
			}
		}
	},

	layout: function(){
		Ext.ux.grid.BufferView.superclass.layout.call(this);
		this.update();
	}
});


var ExtButtonPanel = Ext.extend(Ext.Panel, {
	
    layout:'table',
    defaultType: 'button',
    baseCls: 'x-plain',
    cls: 'btn-panel',
    menu: undefined,
    split: true, 
    

    constructor: function(options){
    	
    	Ext.applyIf(options,{
    		columns:2,
    		colspan:3, 
    		width:250
    	})   
    	
    	var buttons = options.items ;
        for(var i = 0, b; b = buttons[i]; i++){
            b.menu = this.menu;
            b.enableToggle = this.enableToggle; 
            b.split = this.split;
            b.arrowAlign = this.arrowAlign;
            b.style = options.style || {display: 'inline', margin : '10 15 0 0px' } ;
        }
        var items = buttons;  

        ExtButtonPanel.superclass.constructor.call(this, {
	            items: items,
	            renderTo:options.renderTo,
	            region:options.region,
	            height:options.height,  
	            width:options.width,
	            layoutConfig: {
	                columns:options.columns
	            }
	        });
    	}
 });


Ext.override(Ext.Toolbar,{
	 constructButton : function(item){
	   if(typeof(btnDenyRight) != "undefined" && btnDenyRight != "") {
		   var rightStr = "," + btnDenyRight + "," ;
		   var text = "," + item.text + "," ;
		   var reg1=new RegExp(" ","g"); 
		   rightStr = rightStr.replace(reg1,""); 
		   text = text.replace(reg1,""); 
		   if(rightStr.indexOf(text) > -1) {
			   item.disabled = true;
		   }
 	   }
       var b = item.events ? item : this.createComponent(item, item.split ? 'splitbutton' : this.defaultType);
       return b;
   }
})/*!
 * Ext JS Library 3.4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */
Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.FileUploadField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField,  {
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: 'Browse...',
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,

    /**
     * @hide
     * @method autoSize
     */
    autoSize: Ext.emptyFn,

    // private
    initComponent: function(){
        Ext.ux.form.FileUploadField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.FileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.ux.form.FileUploadField.superclass.onRender.call(this, ct, position);

        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');
        this.createFileInput();

        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));

        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }

        this.bindListeners();
        this.resizeEl = this.positionEl = this.wrap;
    },
    
    bindListeners: function(){
        this.fileInput.on({
            scope: this,
            mouseenter: function() {
                this.button.addClass(['x-btn-over','x-btn-focus'])
            },
            mouseleave: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            mousedown: function(){
                this.button.addClass('x-btn-click')
            },
            mouseup: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            change: function(){
                var v = this.fileInput.dom.value;
                this.setValue(v);
                this.fireEvent('fileselected', this, v);    
            }
        }); 
    },
    
    createFileInput : function() {
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input',
            type: 'file',
            size: 1
        });
    },
    
    reset : function(){
        if (this.rendered) {
            this.fileInput.remove();
            this.createFileInput();
            this.bindListeners();
        }
        Ext.ux.form.FileUploadField.superclass.reset.call(this);
    },

    // private
    getFileInputId: function(){
        return this.id + '-file';
    },

    // private
    onResize : function(w, h){
        Ext.ux.form.FileUploadField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },
    
    onDisable: function(){
        Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
    
    onEnable: function(){
        Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
        this.doDisable(false);

    },
    
    // private
    doDisable: function(disabled){
        this.fileInput.dom.disabled = disabled;
        this.button.setDisabled(disabled);
    },


    // private
    preFocus : Ext.emptyFn,

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    }

});

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField);

// backwards compat
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;
var bMoveable=true;
var strFrame; 

document.writeln('<iframe id=endDateLayer frameborder=0 width=162 height=211 style="position: absolute;  z-index: 9998; display: none"></iframe>');
strFrame='<style>';
strFrame+='INPUT.button{BORDER-RIGHT: #63A3E9 1px solid;BORDER-TOP: #63A3E9 1px solid;BORDER-LEFT: #63A3E9 1px solid;';
strFrame+='BORDER-BOTTOM: #63A3E9 1px solid;BACKGROUND-COLOR: #63A3E9;font-family:宋体;}';
strFrame+='TD{FONT-SIZE: 9pt;font-family:宋体;}';
strFrame+='</style>';
strFrame+='<scr' + 'ipt>';
strFrame+='var datelayerx,datelayery;';
strFrame+='var bDrag;';
strFrame+='function document.onmousemove()';
strFrame+='{if(bDrag && window.event.button==1)';
strFrame+=' {var DateLayer=parent.document.all.endDateLayer.style;';
strFrame+='  DateLayer.posLeft += window.event.clientX-datelayerx;';
strFrame+='  DateLayer.posTop += window.event.clientY-datelayery;}}';
strFrame+='function DragStart()';
strFrame+='{var DateLayer=parent.document.all.endDateLayer.style;';
strFrame+=' datelayerx=window.event.clientX;';
strFrame+=' datelayery=window.event.clientY;';
strFrame+=' bDrag=true;}';
strFrame+='function DragEnd(){';
strFrame+=' bDrag=false;}';
strFrame+='</scr' + 'ipt>';
strFrame+='<div style="z-index:9999;position: absolute; left:0; top:0;" onselectstart="return false">';
strFrame+='<span id=tmpSelectYearLayer  style="z-index: 9999;position: absolute;top: 3; left: 19;display: none"></span>';
strFrame+='<span id=tmpSelectMonthLayer  style="z-index: 9999;position: absolute;top: 3; left: 78;display: none"></span>';
strFrame+='<span id=tmpSelectHourLayer  style="z-index: 9999;position: absolute;top: 188; left: 35px;display: none"></span>';
strFrame+='<span id=tmpSelectMinuteLayer style="z-index:9999;position:absolute;top: 188; left: 77px;display: none"></span>';
strFrame+='<span id=tmpSelectSecondLayer style="z-index:9999;position:absolute;top: 188; left: 119px;display: none"></span>';
strFrame+='<table border=1 cellspacing=0 cellpadding=0 width=142 height=160 bordercolor=#63A3E9 bgcolor=#63A3E9 >';
strFrame+='    <tr><td width=142 height=23  bgcolor=#FFFFFF>';
strFrame+='        <table border=0 cellspacing=1 cellpadding=0 width=158  height=23>';
strFrame+='            <tr align=center >';
strFrame+='                <td width=16 align=center bgcolor=#63A3E9 style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='        onclick="parent.meizzPrevM()" title="向前翻 1 月" ><b >&lt;</b></td>';
strFrame+='       <td width=60 align="center" bgcolor="#63A3E9"  style="font-size:12px;cursor:hand" ';
strFrame+='           onmouseover="style.backgroundColor=\'#aaccf3\'"';
strFrame+='        onmouseout="style.backgroundColor=\'#63A3E9\'" ';
strFrame+='        onclick="parent.tmpSelectYearInnerHTML(this.innerText.substring(0,4))" ';
strFrame+='        title="点击这里选择年份"><span  id=meizzYearHead></span></td>';
strFrame+='       <td width=48 align="center" style="font-size:12px;font-color: #ffffff;cursor:hand" ';
strFrame+='        bgcolor="#63A3E9" onmouseover="style.backgroundColor=\'#aaccf3\'" ';
strFrame+='        onmouseout="style.backgroundColor=\'#63A3E9\'" ';
strFrame+='        onclick="parent.tmpSelectMonthInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+='        title="点击这里选择月份"><span id=meizzMonthHead ></span></td>';
strFrame+='       <td width=16 bgcolor=#63A3E9 align=center style="font-size:12px;cursor: hand;color: #ffffff" ';
strFrame+='        onclick="parent.meizzNextM()" title="向后翻 1 月" ><b >&gt;</b></td>';
strFrame+='      </tr>';
strFrame+='     </table></td></tr>';
strFrame+='    <tr><td width=142 height=18 >';
strFrame+='     <table border=0 cellspacing=0 cellpadding=2 bgcolor=#63A3E9 ' + (bMoveable? 'onmousedown="DragStart()" onmouseup="DragEnd()"':'');
strFrame+='    BORDERCOLORLIGHT=#63A3E9 BORDERCOLORDARK=#FFFFFF width=140 height=20  style="cursor:' + (bMoveable ? 'move':'default') + '">';
strFrame+='    <tr><td style="font-size:12px;color:#ffffff" width=20>&nbsp;日</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >&nbsp;一</td><td style="font-size:12px;color:#FFFFFF">&nbsp;二</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >&nbsp;三</td><td style="font-size:12px;color:#FFFFFF" >&nbsp;四</td>';
strFrame+='<td style="font-size:12px;color:#FFFFFF" >&nbsp;五</td><td style="font-size:12px;color:#FFFFFF" >&nbsp;六</td></tr>';
strFrame+='</table></td></tr>';
strFrame+='  <tr ><td width=142 height=120 >';
strFrame+='    <table border=1 cellspacing=2 cellpadding=2 BORDERCOLORLIGHT=#63A3E9 BORDERCOLORDARK=#FFFFFF bgcolor=#fff8ec width=140 height=120 >';
var n=0; for (j=0;j<5;j++){ strFrame+= ' <tr align=center >'; for (i=0;i<7;i++){
strFrame+='<td width=20 height=20 id=meizzDay'+n+' style="font-size:12px" onclick=parent.meizzDayClick(this.innerText,0)></td>';n++;}
strFrame+='</tr>';}
strFrame+='      <tr align=center >';
for (i=35;i<37;i++)strFrame+='<td width=20 height=20 id=meizzDay'+i+' style="font-size:12px"  onclick="parent.meizzDayClick(this.innerText,0)"></td>';
strFrame+='        <td colspan=5 align=right style="color:#1478eb"><span onclick="parent.setNull()" style="font-size:12px;cursor: hand"';
strFrame+='         onmouseover="style.color=\'#ff0000\'" onmouseout="style.color=\'#1478eb\'" title="将日期置空">置空</span>&nbsp;&nbsp;<span onclick="parent.meizzToday()" style="font-size:12px;cursor: hand"';
strFrame+='         onmouseover="style.color=\'#ff0000\'" onmouseout="style.color=\'#1478eb\'" title="当前日期时间">当前</span>&nbsp;&nbsp;<span style="cursor:hand" id=evaAllOK onmouseover="style.color=\'#ff0000\'" onmouseout="style.color=\'#1478eb\'"  onclick="parent.closeLayer()" title="关闭日历">关闭&nbsp;</span></td></tr>';
strFrame+='    </table></td></tr><tr ><td >';
strFrame+='        <table border=0 cellspacing=1 cellpadding=0 width=100%   bgcolor=#FFFFFF height=22 >';
strFrame+='          <tr bgcolor="#63A3E9"><td id=bUseTimeLayer width=30  style="cursor:hand;" title="点击这里启用/禁用时间"';
strFrame+='    onmouseover="style.backgroundColor=\'#aaccf3\'" align=center onmouseout="style.backgroundColor=\'#63A3E9\'"';
strFrame+='     onclick="parent.UseTime(this)">';
strFrame+=' <span></span></td>';
strFrame+='             <td style="cursor:hand" onclick="parent.tmpSelectHourInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+=' onmouseover="style.backgroundColor=\'#aaccf3\'" onmouseout="style.backgroundColor=\'#63A3E9\'"';
strFrame+=' title="点击这里选择时间" align=center width=42>' ;
strFrame+='     <span id=meizzHourHead></span></td>';
strFrame+='             <td style="cursor:hand" onclick="parent.tmpSelectMinuteInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+=' onmouseover="style.backgroundColor=\'#aaccf3\'" onmouseout="style.backgroundColor=\'#63A3E9\'"';
strFrame+=' title="点击这里选择时间" align=center width=42>' ;
strFrame+='     <span id=meizzMinuteHead></span></td>';
strFrame+='             <td style="cursor:hand" onclick="parent.tmpSelectSecondInnerHTML(this.innerText.length==3?this.innerText.substring(0,1):this.innerText.substring(0,2))"';
strFrame+=' onmouseover="style.backgroundColor=\'#aaccf3\'" onmouseout="style.backgroundColor=\'#63A3E9\'"';
strFrame+=' title="点击这里选择时间" align=center width=42>' ;
strFrame+='     <span id=meizzSecondHead></span></td>';
strFrame+='    </tr></table></td></tr></table></div>';

window.frames.endDateLayer.document.writeln(strFrame);
window.frames.endDateLayer.document.close();  // 解决ie进度条不结束的问题

 

// ==================================================== WEB 页面显示部分
// ======================================================
var outObject;
var outButton;  // 点击的按钮


var outDate="";  // 存放对象的日期

var bUseTime=true;  // 是否使用时间
var odatelayer=window.frames.endDateLayer.document.all;  // 存放日历对象
var odatelayer=window.endDateLayer.document.all;
// odatelayer.bUseTimeLayer.innerText="NO";
bImgSwitch();
odatelayer.bUseTimeLayer.innerHTML=bImg;

function setday(tt,obj) // 主调函数
{
 
 if (arguments.length > 2){alert("对不起！傳入本控件的参数太多！");return;}
 if (arguments.length == 0){alert("对不起！您沒有傳回本控件任何参数");return;}
 var dads = document.all.endDateLayer.style;
 var th = tt;
 var ttop = tt.offsetTop; // TT控件的定位点高


 var thei = tt.clientHeight; // TT控件本身的高
 var tleft = tt.offsetLeft; // TT控件的定位点宽


 var ttyp = tt.type; // TT控件的类型


 while (tt = tt.offsetParent){ttop+=tt.offsetTop; tleft+=tt.offsetLeft;}
 dads.top = (ttyp=="image") ? ttop+thei : ttop+thei+6;
 dads.left = tleft;
 outObject = (arguments.length == 1) ? th : obj;
 outButton = (arguments.length == 1) ? null : th; // 设定外部点击的按钮


 // 根据当前输入框的日期显示日历的年月

 var reg = /^(\d+)-(\d{1,2})-(\d{1,2})/;  // 不含时间
 var r = outObject.value.match(reg);
 if(r!=null){
	  r[2]=r[2]-1;
	  var d=new Date(r[1],r[2],r[3]);
	  if(d.getFullYear()==r[1] && d.getMonth()==r[2] && d.getDate()==r[3])
	  {
		   outDate=d;
		   parent.meizzTheYear = r[1];
		   parent.meizzTheMonth = r[2];
		   parent.meizzTheDate = r[3];
	  }else {
		  outDate="";
	  }
	  meizzSetDay(r[1],r[2]+1);
 }else{
  outDate="";
  meizzSetDay(new Date().getFullYear(), new Date().getMonth() + 1);
 }
 dads.display = '';

 // 判断初始化时是否使用时间,非严格验证
 if (outObject.value.length>10){
	  bUseTime=true;
	  bImgSwitch();
	  //odatelayer.bUseTimeLayer.innerHTML=bImg;
	  meizzWriteHead(meizzTheYear,meizzTheMonth);
 }else{
     //bUseTime=false; //打开初始化的时候，选择时分秒
	  odatelayer.bUseTimeLayer.onclick=null; //取消事件
	  bImgSwitch();
	  //odatelayer.bUseTimeLayer.innerHTML=bImg;禁止关闭时间
	  odatelayer.bUseTimeLayer.innerHTML="时间:";
	  odatelayer.bUseTimeLayer.title=""; //取消悬浮提示
	  meizzWriteHead(meizzTheYear,meizzTheMonth);
 }

 try
 {
  event.returnValue=false;
 }
 catch (e)
 {
  // 此处排除错误，错误原因暂未找到。

 }
}

var MonHead = new Array(12); // 定义阳历中每个月的最大天数


MonHead[0] = 31; MonHead[1] = 28; MonHead[2] = 31; MonHead[3] = 30; MonHead[4]  = 31; MonHead[5]  = 30;
MonHead[6] = 31; MonHead[7] = 31; MonHead[8] = 30; MonHead[9] = 31; MonHead[10] = 30; MonHead[11] = 31;

var meizzTheYear=new Date().getFullYear(); // 定义年的变量的初始值


var meizzTheMonth=new Date().getMonth()+1; // 定义月的变量的初始值


var meizzTheDate=new Date().getDate(); // 定义日的变量的初始值
var meizzTheHour=new Date().getHours(); // 定义小时变量的初始值


var meizzTheMinute=new Date().getMinutes();// 定义分钟变量的初始值

var meizzTheSecond=new Date().getSeconds();// 定义秒变量的初始值


var meizzWDay=new Array(37); // 定义写日期的数组

function document.onclick() // 任意点击时关闭该控件 //ie6的情况可以由下面的切换焦点处理代替
{ 
 with(window.event)
 {
  if (srcElement != outObject && srcElement != outButton)
  closeLayer();
 }
}

function document.onkeyup()  // 按Esc键关闭，切换焦点关闭
{
 if (window.event.keyCode==27){
   if(outObject)outObject.blur();
   closeLayer();
 }else if(document.activeElement){ 
	 if(document.activeElement != outObject && document.activeElement != outButton)
 {
   closeLayer();
  }
 }
}

function meizzWriteHead(yy,mm,ss) // 往 head 中写入当前的年与月

{
 odatelayer.meizzYearHead.innerText = yy + " 年";
 odatelayer.meizzMonthHead.innerText = format(mm) + " 月";
 // 插入当前小时、分
 odatelayer.meizzHourHead.innerText=bUseTime?(meizzTheHour+" 时"):""; 
 odatelayer.meizzMinuteHead.innerText=bUseTime?(meizzTheMinute+" 分"):"";
 odatelayer.meizzSecondHead.innerText=bUseTime?(meizzTheSecond+" 秒"):"";
}

function tmpSelectYearInnerHTML(strYear) // 年份的下拉框
{
 if (strYear.match(/\D/)!=null){alert("年份输入参数不是数字！");return;}
 var m = (strYear) ? strYear : new Date().getFullYear();
 if (m < 1000 || m > 9999) {alert("年份值不在 1000 到 9999 之间！");return;}
 var n = m - 50;
 if (n < 1000) n = 1000;
 if (n + 101 > 9999) n = 9974;
 var s = "&nbsp;<select name=tmpSelectYear style='font-size: 12px' "
 s += "onblur='document.all.tmpSelectYearLayer.style.display=\"none\"' "
 s += "onchange='document.all.tmpSelectYearLayer.style.display=\"none\";"
 s += "parent.meizzTheYear = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
 var selectInnerHTML = s;
 for (var i = n; i < n + 101; i++)
 {
  if (i == m) { selectInnerHTML += "<option value='" + i + "' selected>" + i + "年" + "</option>\r\n"; }
  else { selectInnerHTML += "<option value='" + i + "'>" + i + "年" + "</option>\r\n"; }
 }
 selectInnerHTML += "</select>";
 odatelayer.tmpSelectYearLayer.style.display="";
 odatelayer.tmpSelectYearLayer.innerHTML = selectInnerHTML;
 odatelayer.tmpSelectYear.focus();
}

function tmpSelectMonthInnerHTML(strMonth) // 月份的下拉框
{
 if (strMonth.match(/\D/)!=null){alert("月份输入参数不是数字！");return;}
 var m = (strMonth) ? strMonth : new Date().getMonth() + 1;
 var s = "&nbsp;&nbsp;&nbsp;<select name=tmpSelectMonth style='font-size: 12px' "
 s += "onblur='document.all.tmpSelectMonthLayer.style.display=\"none\"' "
 s += "onchange='document.all.tmpSelectMonthLayer.style.display=\"none\";"
 s += "parent.meizzTheMonth = this.value; parent.meizzSetDay(parent.meizzTheYear,parent.meizzTheMonth)'>\r\n";
 var selectInnerHTML = s;
 for (var i = 1; i < 13; i++)
 {
  if (i == m) { selectInnerHTML += "<option value='"+i+"' selected>"+i+"月"+"</option>\r\n"; }
  else { selectInnerHTML += "<option value='"+i+"'>"+i+"月"+"</option>\r\n"; }
 }
 selectInnerHTML += "</select>";
 odatelayer.tmpSelectMonthLayer.style.display="";
 odatelayer.tmpSelectMonthLayer.innerHTML = selectInnerHTML;
 odatelayer.tmpSelectMonth.focus();
}

/** *** 增加 小时、分钟 ** */
function tmpSelectHourInnerHTML(strHour) // 小时的下拉框
{
 if (!bUseTime){return;}

 if (strHour.match(/\D/)!=null){alert("小时参数不是数字！");return;}
 var m = (strHour) ? strHour : new Date().getHours();
 var s = "<select name=tmpSelectHour style='font-size: 12px' "
 s += "onblur='document.all.tmpSelectHourLayer.style.display=\"none\"' "
 s += "onchange='document.all.tmpSelectHourLayer.style.display=\"none\";"
 s += "parent.meizzTheHour = this.value; parent.evaSetTime(parent.meizzTheHour,parent.meizzTheMinute);'>\r\n";
 var selectInnerHTML = s;
 for (var i = 0; i < 24; i++)
 {
  if (i == m) { selectInnerHTML += "<option value='"+i+"' selected>"+i+"</option>\r\n"; }
  else { selectInnerHTML += "<option value='"+i+"'>"+i+"</option>\r\n"; }
 }
 selectInnerHTML += "</select>";
 odatelayer.tmpSelectHourLayer.style.display="";
 odatelayer.tmpSelectHourLayer.innerHTML = selectInnerHTML;
 odatelayer.tmpSelectHour.focus();
}

function tmpSelectMinuteInnerHTML(strMinute) // 分钟的下拉框
{
 if (!bUseTime){return;}

 if (strMinute.match(/\D/)!=null){alert("分钟输入数字不是数字！");return;}
 var m = (strMinute) ? strMinute : new Date().getMinutes();
 var s = "<select name=tmpSelectMinute style='font-size: 12px' "
 s += "onblur='document.all.tmpSelectMinuteLayer.style.display=\"none\"' "
 s += "onchange='document.all.tmpSelectMinuteLayer.style.display=\"none\";"
 s += "parent.meizzTheMinute = this.value; parent.evaSetTime(parent.meizzTheHour,parent.meizzTheMinute);'>\r\n";
 var selectInnerHTML = s;
 for (var i = 0; i < 60; i++)
 {
  if (i == m) { selectInnerHTML += "<option value='"+i+"' selected>"+i+"</option>\r\n"; }
  else { selectInnerHTML += "<option value='"+i+"'>"+i+"</option>\r\n"; }
 }
 selectInnerHTML += "</select>";
 odatelayer.tmpSelectMinuteLayer.style.display="";
 odatelayer.tmpSelectMinuteLayer.innerHTML = selectInnerHTML;
 odatelayer.tmpSelectMinute.focus();
}

function tmpSelectSecondInnerHTML(strSecond) // 秒的下拉框

{
 if (!bUseTime){return;}

 if (strSecond.match(/\D/)!=null){alert("秒钟输入不是数字！");return;}
 var m = (strSecond) ? strSecond : new Date().getMinutes();
 var s = "<select name=tmpSelectSecond style='font-size: 12px' "
 s += "onblur='document.all.tmpSelectSecondLayer.style.display=\"none\"' "
 s += "onchange='document.all.tmpSelectSecondLayer.style.display=\"none\";"
 s += "parent.meizzTheSecond = this.value; parent.evaSetTime(parent.meizzTheHour,parent.meizzTheMinute,parent.meizzTheSecond);'>\r\n";
 var selectInnerHTML = s;
 for (var i = 0; i < 60; i++)
 {
  if (i == m) { selectInnerHTML += "<option value='"+i+"' selected>"+i+"</option>\r\n"; }
  else { selectInnerHTML += "<option value='"+i+"'>"+i+"</option>\r\n"; }
 }
 selectInnerHTML += "</select>";
 odatelayer.tmpSelectSecondLayer.style.display="";
 odatelayer.tmpSelectSecondLayer.innerHTML = selectInnerHTML;
 odatelayer.tmpSelectSecond.focus();
}

function closeLayer() // 这个层的关闭
{
 var o = document.getElementById("endDateLayer");
 if (o != null)
 {
  o.style.display="none";
 }
}

function showLayer() // 这个层的关闭
{
 document.all.endDateLayer.style.display="";
}

function IsPinYear(year) // 判断是否闰平年

{
 if (0==year%4&&((year%100!=0)||(year%400==0))) return true;else return false;
}

function GetMonthCount(year,month) // 闰年二月为29天

{
 var c=MonHead[month-1];if((month==2)&&IsPinYear(year)) c++;return c;
}

function GetDOW(day,month,year) // 求某天的星期几

{
 var dt=new Date(year,month-1,day).getDay()/7; return dt;
}

function meizzPrevY() // 往前翻 Year
{
 if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear--;}
 else{alert("年份超出范围（1000-9999）！");}
 meizzSetDay(meizzTheYear,meizzTheMonth);
}
function meizzNextY() // 往后翻 Year
{
 if(meizzTheYear > 999 && meizzTheYear <10000){meizzTheYear++;}
 else{alert("年份超出范围（1000-9999）！");}
 meizzSetDay(meizzTheYear,meizzTheMonth);
}
function setNull()
{
 outObject.value = '';
 closeLayer();
}
function meizzToday() // Today Button
{
 parent.meizzTheYear  = new Date().getFullYear();
 parent.meizzTheMonth = new Date().getMonth()+1;
 parent.meizzTheDate  = new Date().getDate();
 parent.meizzTheHour  = new Date().getHours();
 parent.meizzTheMinute = new Date().getMinutes();
 parent.meizzTheSecond = new Date().getSeconds();
 var meizzTheSecond  = new Date().getSeconds();

 if (meizzTheMonth<10 && meizzTheMonth.length<2) // 格式化成两位数字
 {
  parent.meizzTheMonth="0"+parent.meizzTheMonth;
 }
 if (parent.meizzTheDate<10 && parent.meizzTheDate.length<2) // 格式化成两位数字
 {
  parent.meizzTheDate="0"+parent.meizzTheDate;
 }
 // meizzSetDay(meizzTheYear,meizzTheMonth);
 if(outObject)
 {
  if (bUseTime)
  {
   outObject.value= parent.meizzTheYear + "-" + format( parent.meizzTheMonth) + "-" + 
       format(parent.meizzTheDate) + " " + format(parent.meizzTheHour) + ":" + 
       format(parent.meizzTheMinute) + ":" + format(parent.meizzTheSecond); 
       // 注：在这里你可以输出改成你想要的格式
  }
  else
  {
   outObject.value= parent.meizzTheYear + "-" + format( parent.meizzTheMonth) + "-" + 
       format(parent.meizzTheDate); // 注：在这里你可以输出改成你想要的格式
  }
 }
 closeLayer();
}
function meizzPrevM() // 往前翻月份
{
 if(meizzTheMonth>1){meizzTheMonth--}else{meizzTheYear--;meizzTheMonth=12;}
 meizzSetDay(meizzTheYear,meizzTheMonth);
}
function meizzNextM() // 往后翻月份
{
 if(meizzTheMonth==12){meizzTheYear++;meizzTheMonth=1}else{meizzTheMonth++}
 meizzSetDay(meizzTheYear,meizzTheMonth);
}

// TODO: 整理代码
function meizzSetDay(yy,mm) // 主要的写程序**********
{
 meizzWriteHead(yy,mm);
 // 设置当前年月的公共变量为传入值


 meizzTheYear=yy;
 meizzTheMonth=mm;

 for (var i = 0; i < 37; i++){meizzWDay[i]=""}; // 将显示框的内容全部清空


 var day1 = 1,day2=1,firstday = new Date(yy,mm-1,1).getDay(); // 某月第一天的星期几


 for (i=0;i<firstday;i++)meizzWDay[i]=GetMonthCount(mm==1?yy-1:yy,mm==1?12:mm-1)-firstday+i+1 // 上个月的最后几天


 for (i = firstday; day1 < GetMonthCount(yy,mm)+1; i++) { meizzWDay[i]=day1;day1++; }
 for (i=firstday+GetMonthCount(yy,mm);i<37;i++) { meizzWDay[i]=day2;day2++; }
 for (i = 0; i < 37; i++)
 {
  var da = eval("odatelayer.meizzDay"+i) // 书写新的一个月的日期星期排列


 if (meizzWDay[i]!="")
 {
  // 初始化边框

  da.borderColorLight="#63A3E9";
  da.borderColorDark="#63A3E9";
  da.style.color="#1478eb";
  if(i<firstday)  // 上个月的部分
  {
   da.innerHTML="<b><font color=#BCBABC>" + meizzWDay[i] + "</font></b>";
   da.title=(mm==1?12:mm-1) +"月" + meizzWDay[i] + "日";
   da.onclick=Function("meizzDayClick(this.innerText,-1)");

   if(!outDate)
    da.style.backgroundColor = ((mm==1?yy-1:yy) == new Date().getFullYear() && 
     (mm==1?12:mm-1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
      "#5CEFA0":"#f5f5f5";
   else
   {
    da.style.backgroundColor =((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())? "#84C1FF" :
    (((mm==1?yy-1:yy) == new Date().getFullYear() && (mm==1?12:mm-1) == new Date().getMonth()+1 && 
    meizzWDay[i] == new Date().getDate()) ? "#5CEFA0":"#f5f5f5");
    // 将选中的日期显示为凹下去


    if((mm==1?yy-1:yy)==outDate.getFullYear() && (mm==1?12:mm-1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#FFFFFF";
     da.borderColorDark="#63A3E9";
    }
   }
  }
  else if (i>=firstday+GetMonthCount(yy,mm))  // 下个月的部分
  {
   da.innerHTML="<b><font color=#BCBABC>" + meizzWDay[i] + "</font></b>";
   da.title=(mm==12?1:mm+1) +"月" + meizzWDay[i] + "日";
   da.onclick=Function("meizzDayClick(this.innerText,1)");
   if(!outDate)
    da.style.backgroundColor = ((mm==12?yy+1:yy) == new Date().getFullYear() && 
     (mm==12?1:mm+1) == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate()) ?
      "#5CEFA0":"#f5f5f5";
   else
   {
    da.style.backgroundColor =((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())? "#84C1FF" :
    (((mm==12?yy+1:yy) == new Date().getFullYear() && (mm==12?1:mm+1) == new Date().getMonth()+1 && 
    meizzWDay[i] == new Date().getDate()) ? "#5CEFA0":"#f5f5f5");
    // 将选中的日期显示为凹下去


    if((mm==12?yy+1:yy)==outDate.getFullYear() && (mm==12?1:mm+1)== outDate.getMonth() + 1 && 
    meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#FFFFFF";
     da.borderColorDark="#63A3E9";
    }
   }
  }
  else  // 本月的部分

  {
   da.innerHTML="<b>" + meizzWDay[i] + "</b>";
   da.title=mm +"月" + meizzWDay[i] + "日";
   da.onclick=Function("meizzDayClick(this.innerText,0)");  // 给td赋予onclick事件的处理


   // 如果是当前选择的日期，则显示亮蓝色的背景；如果是当前日期，则显示暗黄色背景
   if(!outDate)
    da.style.backgroundColor = (yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate())?
     "#5CEFA0":"#f5f5f5";
   else
   {
    da.style.backgroundColor =(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())?
     "#84C1FF":((yy == new Date().getFullYear() && mm == new Date().getMonth()+1 && meizzWDay[i] == new Date().getDate())?
     "#5CEFA0":"#f5f5f5");
    // 将选中的日期显示为凹下去


    if(yy==outDate.getFullYear() && mm== outDate.getMonth() + 1 && meizzWDay[i]==outDate.getDate())
    {
     da.borderColorLight="#FFFFFF";
     da.borderColorDark="#63A3E9";
    }
   }
  }
    da.style.cursor="hand"
   }
  else { da.innerHTML="";da.style.backgroundColor="";da.style.cursor="default"; }
 }
}

function meizzDayClick(n,ex) // 点击显示框选取日期，主输入函数*************
{
	 parent.meizzTheDate=n;
	 var yy=meizzTheYear;
	 var mm = parseInt(meizzTheMonth)+ex; // ex表示偏移量，用于选择上个月份和下个月份的日期
	 var hh=meizzTheHour;
	 var mi=meizzTheMinute;
	 var se=meizzTheSecond;
	 // 判断月份，并进行对应的处理
	
	
	 if(mm<1){
	  yy--;
	  mm=12+mm;
	 }
	 else if(mm>12){
	  yy++;
	  mm=mm-12;
	 }
	
	 if (mm < 10) {mm = "0" + mm;}
	 if (hh<10)  {hh="0" + hh;} // 时
	
	 if (mi<10)  {mi="0" + mi;} // 分
	
	 if (se<10)  {se="0" + se;} // 秒
	
	
	 if (outObject)
	 {
	  if (!n) { // outObject.value="";
	   return;}
	  if ( n < 10){n = "0" + n;}
	
	  WriteDateTo(yy,mm,n,hh,mi,se);
	
	  closeLayer(); 
	  if (bUseTime)
	  {
	   try
	   {
	    outButton.click();
	   }
	   catch (e)
	   {
	    setday(outObject);
	   }
	  }
	 }
	 else {closeLayer(); alert("您所要输出的控件对象并不存在！");}
	 closeLayer();
}

function format(n) // 格式化数字为两位字符表示
{
 var m=new String();
 var tmp=new String(n);
 if (n<10 && tmp.length<2)
 {
  m="0"+n;
 }
 else
 {
  m=n;
 }
 return m;
}

function evaSetTime()  // 设置用户选择的小时、分钟

{
 odatelayer.meizzHourHead.innerText=meizzTheHour+" 时";
 odatelayer.meizzMinuteHead.innerText=meizzTheMinute+" 分";
 odatelayer.meizzSecondHead.innerText=meizzTheSecond+" 秒";
 WriteDateTo(meizzTheYear,meizzTheMonth,meizzTheDate,meizzTheHour,meizzTheMinute,meizzTheSecond)
}

function evaSetTimeNothing() // 设置时间控件为空
{
 odatelayer.meizzHourHead.innerText="";
 odatelayer.meizzMinuteHead.innerText="";
 odatelayer.meizzSecondHead.innerText="";
 WriteDateTo(meizzTheYear,meizzTheMonth,meizzTheDate,meizzTheHour,meizzTheMinute,meizzTheSecond)
}

function evaSetTimeNow() // 设置时间控件为当前时间

{
 odatelayer.meizzHourHead.innerText=new Date().getHours()+" 时";
 odatelayer.meizzMinuteHead.innerText=new Date().getMinutes()+" 分";
 odatelayer.meizzSecondHead.innerText=new Date().getSeconds()+" 秒";
 meizzTheHour = new Date().getHours();
 meizzTheMinute = new Date().getMinutes();
 meizzTheSecond = new Date().getSeconds();
 WriteDateTo(meizzTheYear,meizzTheMonth,meizzTheDate,meizzTheHour,meizzTheMinute,meizzTheSecond)
}

function UseTime(ctl)
{
	 bUseTime=!bUseTime;
	 if (bUseTime) {
		  bImgSwitch();
		  ctl.innerHTML=bImg;
		  evaSetTime();  // 显示时间，用户原来选择的时间
		  evaSetTimeNow(); //显示当前时间
	 }else{
		  bImgSwitch();
		  ctl.innerHTML=bImg;
		  evaSetTimeNothing();
	 }
}

function WriteDateTo(yy,mm,n,hh,mi,se)
{
 if (bUseTime)
 {
  outObject.value= yy + "-" + format(mm) + "-" + format(n) + " " + format(hh) + ":" + format(mi) + ":" + format(se); // 注：在这里你可以输出改成你想要的格式
 }
 else
 {
  outObject.value= yy + "-" + format(mm) + "-" + format(n); // 注：在这里你可以输出改成你想要的格式
 }
}

function bImgSwitch()
{
 if (bUseTime) {
  bImg="关闭";
 } else {
  bImg="开启";
 }

}


 Ext.ns("Ext.ux.grid.GridSummary"); // namespace Ext.ux.grid.GridSummary

Ext.ux.grid.GridSummary = function(config) {
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.grid.GridSummary, Ext.util.Observable, {
  init : function(grid) {
    this.grid = grid;
    this.cm = grid.getColumnModel(); 
    this.view = grid.getView();
    var v = this.view;

    v.onLayout = this.onLayout; // override GridView's onLayout() method

    v.afterMethod('render', this.refreshSummary, this);
    v.afterMethod('refresh', this.refreshSummary, this);
    v.afterMethod('setSumValue', this.test, this);
    v.afterMethod('syncScroll', this.syncSummaryScroll, this);
    v.afterMethod('onColumnWidthUpdated', this.doWidth, this);
    v.afterMethod('onAllColumnWidthsUpdated', this.doAllWidths, this);
    v.afterMethod('onColumnHiddenUpdated', this.doHidden, this);
    v.afterMethod('onUpdate', this.refreshSummary, this);
    v.afterMethod('onRemove', this.refreshSummary, this);

    // update summary row on store's add / remove / clear events
    grid.store.on('add', this.refreshSummary, this);
    grid.store.on('remove', this.refreshSummary, this);
    grid.store.on('clear', this.refreshSummary, this);

    if (!this.rowTpl) {
      this.rowTpl = new Ext.Template(
        '<div class="x-grid3-summary-row x-grid3-gridsummary-row-offset">',
          '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
            '<tbody><tr>{cells}</tr></tbody>',
          '</table>',
        '</div>'
      );
      this.rowTpl.disableFormats = true;
    }
    this.rowTpl.compile();

    if (!this.cellTpl) {
      this.cellTpl = new Ext.Template(
        '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
          '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
        "</td>"
      );
      this.cellTpl.disableFormats = true;
    }
    this.cellTpl.compile();
  },

  calculate : function(rs, cs) {
    var data = {}, r, c, cfg = this.cm.config, cf;
    for (var i = 0, len = cs.length; i < len; i++) {
      c = cs[i];
      cf = cfg[i];
      data[c.name] = 0;
      for (var j = 0, jlen = rs.length; j < jlen; j++) {
        r = rs[j];
        if (cf && cf.summaryType) {
          data[c.name] = Ext.ux.grid.GridSummary.Calculations[cf.summaryType](data[c.name] || 0, r, c.name, data);
        }
      }
    }

    return data;
  },

  onLayout : function(vw, vh) {
    if ('number' != Ext.type(vh)) { // prevent onLayout from choking when height:'auto'
      return;
    }
    // note: this method is scoped to the GridView
    if (!this.grid.getGridEl().hasClass('x-grid-hide-gridsummary')) {
      // readjust gridview's height only if grid summary row is visible
      this.scroller.setHeight(vh - this.summary.getHeight());
    }
  },

  syncSummaryScroll : function() {
    var mb = this.view.scroller.dom;
    this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft;
    this.view.summaryWrap.dom.scrollLeft = mb.scrollLeft; // second time for IE (1/2 time first fails, other browsers ignore)
  },

  doWidth : function(col, w, tw) {
    var s = this.view.summary.dom;
    s.firstChild.style.width = tw;
    s.firstChild.rows[0].childNodes[col].style.width = w;
  },

  doAllWidths : function(ws, tw) {
    var s = this.view.summary.dom, wlen = ws.length;
    s.firstChild.style.width = tw;
    cells = s.firstChild.rows[0].childNodes;
    for (var j = 0; j < wlen; j++) {
      cells[j].style.width = ws[j];
    }
  },

  doHidden : function(col, hidden, tw) {
    var s = this.view.summary.dom;
    var display = hidden ? 'none' : '';
    s.firstChild.style.width = tw;
    s.firstChild.rows[0].childNodes[col].style.display = display;
  },
  putSumInfo:null,
  setSumValue : function(jsonV) {
    var cs = this.view.getColumnData();
    var buf = [], c, p = {}, last = cs.length-1;

    for (var i = 0, len = cs.length; i < len; i++) {
      c = cs[i];
      p.id = c.id; 
      p.style = c.style;
      p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
      if (jsonV&&jsonV[c.name]) {
		p.value = jsonV[c.name];
      } else {
        p.value = '';
      }
      if (p.value == undefined || p.value === "") p.value = " ";
      buf[buf.length] = this.cellTpl.apply(p);
    }

    if (!this.view.summaryWrap) {
      this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
        tag: 'div',
        cls: 'x-grid3-gridsummary-row-inner'
      }, true);
    } else {
      this.view.summary.remove();
    }
    this.putSumInfo = this.rowTpl.apply({
      tstyle: 'width:' + this.view.getTotalWidth() + ';',
      cells: buf.join('')
    });
    this.view.summary = this.view.summaryWrap.insertHtml('afterbegin',this.putSumInfo, true);
  },
  refreshSumValue:function() {
    if (!this.view.summaryWrap) {
      this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
        tag: 'div',
        cls: 'x-grid3-gridsummary-row-inner'
      }, true);
    } else {
      this.view.summary.remove();
    }
    this.view.summary = this.view.summaryWrap.insertHtml('afterbegin', this.putSumInfo, true);
  },
  renderSummary : function(o, cs) {
    cs = cs || this.view.getColumnData();
    var cfg = this.cm.config;
    var buf = [], c, p = {}, cf, last = cs.length-1;

    for (var i = 0, len = cs.length; i < len; i++) {
      c = cs[i];
      cf = cfg[i];
      p.id = c.id;
      p.style = c.style;
      p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
      if (cf.summaryType || cf.summaryRenderer) {
        p.value = (cf.summaryRenderer || c.renderer)(o.data[c.name], p, o);
      } else {
        p.value = '';
      }
      if (p.value == undefined || p.value === "") p.value = "&#160;";
      buf[buf.length] = this.cellTpl.apply(p);
    }

    return this.rowTpl.apply({
      tstyle: 'width:' + this.view.getTotalWidth() + ';',
      cells: buf.join('')
    });
  },

  refreshSummary : function() {
  	if(this.putSumInfo){
  		//alert(this.putSumInfo);
  		this.refreshSumValue(this.putSumInfo);
  		return;
  	}
    var g = this.grid, ds = g.store;
    var cs = this.view.getColumnData();
    var rs = ds.getRange();
    var data = this.calculate(rs, cs);
    var buf = this.renderSummary({data: data}, cs);

    if (!this.view.summaryWrap) {
      this.view.summaryWrap = Ext.DomHelper.insertAfter(this.view.scroller, {
        tag: 'div',
        cls: 'x-grid3-gridsummary-row-inner'
      }, true);
    } else {
      this.view.summary.remove();
    }
    this.view.summary = this.view.summaryWrap.insertHtml('afterbegin', buf, true);
  },

  toggleSummary : function(visible) { // true to display summary row
    var el = this.grid.getGridEl();
    if (el) {
      if (visible === undefined) {
        visible = el.hasClass('x-grid-hide-gridsummary');
      }
      el[visible ? 'removeClass' : 'addClass']('x-grid-hide-gridsummary');

      this.view.layout(); // readjust gridview height
    }
  },

  getSummaryNode : function() {
    return this.view.summary
  }
});

Ext.ux.grid.GridSummary.Calculations = {
  'sum' : function(v, record, field) {
    return v + Ext.num(record.data[field], 0);
  },

  'count' : function(v, record, field, data) {
    return data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
  },

  'max' : function(v, record, field, data) {
    var v = record.data[field];
    var max = data[field+'max'] === undefined ? (data[field+'max'] = v) : data[field+'max'];
    return v > max ? (data[field+'max'] = v) : max;
  },

  'min' : function(v, record, field, data) {
    var v = record.data[field];
    var min = data[field+'min'] === undefined ? (data[field+'min'] = v) : data[field+'min'];
    return v < min ? (data[field+'min'] = v) : min;
  },

  'average' : function(v, record, field, data) {
    var c = data[field+'count'] ? ++data[field+'count'] : (data[field+'count'] = 1);
    var t = (data[field+'total'] = ((data[field+'total'] || 0) + (record.data[field] || 0)));
    return t === 0 ? 0 : t / c;
  }
}function mt_process_viewImage(tableId) {
		
	var id = document.getElementById("chooseValue_"+tableId).value;
	
	if(id == "") {
		alert("请选择需要查看流程图的记录!") ;
		return ;
	}
	
	var trValue = document.getElementById("trValueId_"+id);
	
	var pdId = trValue.pdid ;
	var pId = trValue.pid ;
	var pkey = trValue.pkey ;
	
	if(pdId == "") {
		alert("流程尚未发布,不能显示流程图!") ;
		return ;
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT+"/process.do?method=viewImageByPIdOrKey&key=" + pkey + "&id="+pId;
	
	var tab = parent.mainTab ;
    if(tab){
		n = tab.add({    
			'title':"流程图",    
			closable:true,  //通过html载入目标页    
			html:'<iframe name="imageFrm" scrolling="auto" frameborder="0" width="100%" height="100%" src="'+url+'"></iframe>'   
		}); 
        tab.setActiveTab(n);
	}else {
		window.open(url);
	}	
	
}

function mt_process_view(pId,pName,viewUuid){
	var url = MATECH_SYSTEM_WEB_ROOT+'/process.do?method=processTransfer&view=true&pId='+ pId + "&uuid=" + viewUuid ;
	var n = parent.mainTab.add({     
		'title':pName,  
		 closable:true,  //通过html载入目标页    
		 html:'<iframe scrolling="no" frameborder="0" width="100%" height="100%" src="' + url + '"></iframe>'   
	});    
	parent.mainTab.setActiveTab(n);  
}

function startProByPkey(pKey) {
	window.location = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey;
}

//编辑
function mt_process_edit(pKey) {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value= document.getElementById("chooseValue_" + tableId).value;
	if(value == ''){
		
		value = getChooseValue(tableId);
				
		if(value == "") {
			alert('请选择要修改的数据!');
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}
	
	window.location = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey + "&uuid="+value; 
}


//检查状态
function mt_process_checkState(pKey,uuid) { 
	
	window.location = MATECH_SYSTEM_WEB_ROOT + "/process.do?method=processTransfer&pKey=" + pKey + "&uuid="+value; 
}//新增
function mt_formList_add(_param) {
	
	var formId = document.getElementById("formId").value;
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId=" + formId;
	
	var param=getParamObject();
	for(var key in param){
		if(key=='method'||key=="uuid")continue;
		url+="&"+key+"="+param[key];
		
	}
	_param=_param||{};
	for(var key in _param){
		url+="&"+key+"="+_param[key];
	}
	window.location=url; 
}

//编辑
function mt_formList_edit(_param) {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value= document.getElementById("chooseValue_" + tableId).value;
	if(value == ''){
		
		value = getChooseValue(tableId);
				
		if(value == "") {
			alert('请选择要修改的数据!');
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId=" + formId + "&uuid="+value; 
	var param=getParamObject();
	for(var key in param){
		if(key=='method'||key=="uuid")continue;
		url+="&"+key+"="+param[key];
		
	}
	_param=_param||{};
	for(var key in _param){
		url+="&"+key+"="+_param[key];
	}
	window.location.href=url;
}

//预约
function mt_formList_addOrEdit() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	var value= document.getElementById("chooseValue_" + tableId).value;
	if(value == ''){
		value = getChooseValue(tableId);
		if(value == "") {
			window.location = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId=" + formId;
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要修改的数据!');
			return;
		}
	}
	
	window.location = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&formId=" + formId + "&uuid="+value; 
}

//删除
function mt_formList_remove() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value = document.getElementById("chooseValue_" + tableId).value;
	if(value == ""){
		
		value = getChooseValue(tableId);
		
		if(value == "") {
			alert('请选择要删除的数据!');
			return;
		}
	} 
	
	if(confirm("您确认要删除当前选中数据吗？")){
		var param=getParamObject();
		
		var url =MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=removeFormData&formId=" + formId + "&uuid="+value;
		
		for(var key in param){
			if(key=='method'||key=="uuid")continue;
			url+="&"+key+"="+param[key];
		}
		 window.location =  url;
	} else {
		return;
	}
}


//假删除
function mt_formList_remove_noreal() {
	var formId = document.getElementById("formId").value;
	var tableId = document.getElementById("tableId").value;
	
	var value = document.getElementById("chooseValue_" + tableId).value;
	if(value == ""){
		
		value = getChooseValue(tableId);
		
		if(value == "") {
			alert('请选择要删除的数据!');
			return;
		}
	} 
	
	if(confirm("您确认要删除当前选中数据吗？")){
		var param=getParamObject();
		
		var url =MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=removeFormDataNotReal&formId=" + formId + "&uuid="+value;
		
		for(var key in param){
			if(key=='method'||key=="uuid")continue;
			url+="&"+key+"="+param[key];
		}
		 window.location =  url;
	} else {
		return;
	}
}

//查看
function mt_formList_view(formId) {
	
	var srcFormId = "";
	if(!formId) {
		formId = document.getElementById("formId").value;
	} else {
		srcFormId = document.getElementById("formId").value;
	}
	
	var tableId = document.getElementById("tableId").value;
	
	var value= document.getElementById("chooseValue_" + tableId).value;
	
	if(value == ''){
		
		value = getChooseValue(tableId);
				
		if(value == "") {
			alert('请选择要查看的数据!');
			return;
		
		} else if(value.indexOf(",") > -1) {
			alert('请选择一条需要查看的数据!');
			return;
		}
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formDefine.do?method=formView&view=true&formId=" + formId + "&uuid="+value + "&srcFormId=" + srcFormId; 
	var param=getParamObject();
	for(var key in param){
		if(key=='method'||key=="uuid")continue;
		url+="&"+key+"="+param[key];
	}
	window.location.href=url;
}

//返回
function mt_formList_back() {
	window.history.back(); 
}

//关闭按钮
function mt_formList_close() {
	//closeTab(parent.parent.mainTab);
	closeTab(parent.parent.tab);

}

function mt_form_getRowValues() {
	var tableId = document.getElementById("tableId").value;
	
	var uuid = document.getElementById("chooseValue_" + tableId).value;
	
	if(uuid == "") {
		uuid = getChooseValue(tableId);
		if(uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
	} 
	
	var json = "[";
	
	var uuids = uuid.split(",");
	
	for(var i=0; i < uuids.length; i++) {
		
		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;
		
		json += " {";
		
		var data = "";
		
		for (var j = 0; j < oAttribs.length; j++){
			if(oAttribs[j].specified == true){
				data += "'" + oAttribs[j].nodeName + "':'" + oAttribs[j].nodeValue + "',";
			}
		}
		
		if(data != "") {
			data = data.substring(0, data.length -1);
		}
		
		json += data + "}";
		
		if(i != uuids.length-1) {
			json += ",";
		}
	}
	
	json += "]";

	return eval(json);
}

//列表按钮接口
function mt_form_listBtn_callJava(tableId, btnId) {
	//alert(tableId);
	
	var uuid = document.getElementById("chooseValue_" + tableId).value;
	
	if(uuid == "") {
		uuid = getChooseValue(tableId);
		if(uuid == "") {
			alert('请选择要操作的数据!');
			return;
		}
	}
	
	var requestString = "";
	
	var uuids = uuid.split(",");
	
	for(var i=0; i < uuids.length; i++) {
		
		var divObj = document.getElementById("trValueId_" + uuids[i]);
		var oAttribs = divObj.attributes;
		
		for (var j = 0; j < oAttribs.length; j++){
			if(oAttribs[j].specified == true){
				requestString += "&" + oAttribs[j].nodeName + "=" + oAttribs[j].nodeValue;
			}
		}
	}
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;
	//alert(url);
	//alert(requestString);
	var result = ajaxLoadPageSynch(url, requestString);
	
	alert(result);
	
	
	//alert(method);
	try{
		var method = "goSearch_" + tableId + "(2)";
		eval(method);
	}catch(e){
		alert(e);
	}
}

//表单按钮接口
function mt_form_formBtn_CallJava(btnId) {
	//alert(tableId);
	
	var uuid = document.getElementById("uuid").value;
	
	var requestString = "&uuid=" + uuid;
	
	var url = MATECH_SYSTEM_WEB_ROOT + "/formQueryConfig.do?method=buttonExtHandle&btnId=" + btnId;
	
	var result = ajaxLoadPageSynch(url, requestString);
	
	alert(result);
}

//创建行
function mt_createRow(tableId,rows,cells){
	var rs,cs;
	
	if(rows == ""){
		rs = 0;
	} else {
		rs = rows;
	}
	
	if(cells == ""){
		cs = 0; 
	} else {
		cs = cells;
	}
	
	var table = document.getElementById(tableId);
       
	for(var i=0; i<rs; i++){
		//添加一行
        var newTr = table.insertRow();
		for(var j = 0; j < cs; j++){
	       //添加列
			var newTd = newTr.insertCell();
		}
	}
}

//删除
function mt_remove(t){
	
	if(confirm("您确定要删除吗?")){
		t.parentNode.parentNode.removeNode(true);
		
		if(t.group) { 
			//删除同组的记录
			var imgs = Ext.query("img[group="+t.group+"]") ;
			Ext.each(imgs,function(img){
				img.parentNode.parentNode.removeNode(true);
			}) ;
			
		}
	}
	
	mt_form_total();   
	
	//隐藏列
	if(funExists("mt_subform_after_del")) {
		mt_subform_after_del(t);
	}
}

//删除所有行
function mt_remove_all(table) {
	
    var tableObj = document.getElementById(table);
    
    for(var i=tableObj.rows.length-1; i >= 0 ; i--) {
    	tableObj.deleteRow(i);
    }
}

//新增一行
function mt_add(table,length){
	
	var randomId = Math.round(Math.random() * 10000);
	
	var mt_slist = eval('(' + document.getElementById("mt_slist_" + table).value + ')');
	
	mt_createRow(table,1,length);
	
	var slistLength = mt_slist.length ;
	
	var tbField = document.getElementById(table);
	
	tbField.rows[tbField.rows.length-1].cells[0].innerHTML = "<img id='"+table+"_delImg_"+randomId+"' flag="+table+ "_del style='cursor:hand;' alt='删除本行' onclick='mt_remove(this)' src='" + MATECH_SYSTEM_WEB_ROOT + "/img/close.gif' >";
	
	var colCount = 0;
	
	var cell = tbField.rows[tbField.rows.length-1].cells[0];
	
	for(var i = 1; i <= slistLength; i++){
	
		var inputObj = document.createElement(mt_slist[i-1]) ;
		
		
		if(inputObj.id.indexOf("hidden_") < 0) {
			colCount++;
		}
		
		inputObj.id = inputObj.id + '_' + randomId ;
		
		if(inputObj.refer) {
			//$2, 替换成本行的ID
			inputObj.refer = inputObj.refer.replace("_\$rowIndex", "_" + randomId);
		}
		
		if(inputObj.refer1) {
			//$3, 替换成本行的ID
			inputObj.refer1 = inputObj.refer1.replace("_\$rowIndex", "_" + randomId);
		}
		
		if(inputObj.refer2) {
			//$4, 替换成本行的ID
			inputObj.refer2 = inputObj.refer2.replace("_\$rowIndex", "_" + randomId);
		}
		
	
		if(inputObj.type != "hidden") {
			cell = cell.nextSibling;
		}
		if(cell) {
			cell.appendChild(inputObj) ;
		}else {
			alert("列数设置超过表头定义列数,请检查配置!");
			return ;
		}
		
		if(inputObj.autoid) {
			initCombox(inputObj);
		}
		
		if(inputObj.ext_type == "date") {
			mt_form_initDateSelect(inputObj);
		}
		
	}
	//隐藏列
	if(funExists("mt_subform_after_add")) {
		mt_subform_after_add(table);
	}
	return randomId;
}

//下拉GRID填充列表值
function mt_form_setRowValue(obj) {

	var inputId = obj.inputId;
	var inputProperty = obj.property;
	var name = inputId.replace(inputProperty,"");
	
	var rowIndex = name.split("_")[1];
	var json = Ext.util.JSON.decode(obj.columns);
	
	for(var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_","");
		fieldId = inputProperty + fieldId + "_" + rowIndex;
		if(document.getElementById(fieldId)) {
			document.getElementById(fieldId).value = json[field];
			
			if(Ext.getCmp(fieldId)) {
				Ext.getCmp(fieldId).setRealValue(json[field]);
			}
		}
	}
}

//下拉GRID填充列表值
function mt_form_setRowValues(obj) {
	var jsonArray = Ext.util.JSON.decode(obj.columns);

	var property = obj.property;
	var tableName = property.split("`")[0];
	var colCount = property.split("`")[1];
	
	mt_remove_all(tableName);
	
	for(var i=0; i < jsonArray.length; i++) {
		var json = jsonArray[i];
		var rowIndex = mt_add(tableName, colCount);
		for(var field in jsonArray[i]) {
			var fieldId = field.toLowerCase().replace("hidden_","");
			
			if(fieldId == "select_group") {
				document.getElementById(tableName +"_delImg_"+rowIndex).group = json[field];
			}
			
			fieldId = tableName + "_" + fieldId + "_" + rowIndex;
			if(document.getElementById(fieldId)) {
				document.getElementById(fieldId).value = json[field];
				
				if(Ext.getCmp(fieldId)) {
					Ext.getCmp(fieldId).setRealValue(json[field]);
				}
			}
		}
	}
}

//下拉GRID填充表单值
function mt_form_setValue(obj) {

	var json = Ext.util.JSON.decode(obj.columns);
	
	for(var field in json) {
		var fieldId = field.toLowerCase().replace("hidden_","");
		if(document.getElementById(fieldId)) {
			document.getElementById(fieldId).value = json[field];
			
			if(Ext.getCmp(fieldId)) {
				Ext.getCmp(fieldId).setRealValue(json[field]);
			}
			//Ext.getCmp(fieldId).setRawValue
			//initCombox(document.getElementById(fieldId));
		}
	}
}

//初始化附件上传控件
function mt_form_initAttachFile(param) {
	var inputArray ;
	
	if(param) {
		if(typeof(param) == "string") {
			inputArray = Ext.query("#"+param) ;
		}else {
			var arr = new Array();
			arr.push(param) ;
			inputArray = arr ;
		}
	} else {
		inputArray = Ext.query("input[ext_type=attachFile]") ;
	}
	
	 
	Ext.each(inputArray,function(input){
		attachInit(input.id);
	});

}

//初始化extjs日期控件
function mt_form_initDateSelect(param) {
	var inputArray ;
	
	if(param) {
		if(typeof(param) == "string") {
			inputArray = Ext.query("#"+param) ;
		}else {
			var arr = new Array();
			arr.push(param) ;
			inputArray = arr ;
		}
	} else {
		inputArray = Ext.query("input[ext_type=date]") ;

	}
	
	var plugins = "";
	var format = "Y-m-d";
	
	Ext.each(inputArray,function(input){
		
		if(!input.readOnly) {
			if(input.ext_format) {
				
				if(input.ext_format == "yyyy-MM-dd") {
					plugins = "";
					format = "Y-m-d";
				} else if(input.ext_format == "yyyy-MM") {
					plugins = "monthPickerPlugin";
					format = "Y-m";
				} 
			}
			
			new Ext.form.DateField({
				applyTo:input.id,
				width:100,  
				plugins: plugins,  
				format: format,  
				editable: false,
				cls:"inline"
			});
		}
		
	});
}

//初始化只读
function mt_form_initReadonly() {
	var inputArray = Ext.query("input[ext_readonly]") ;
	
	Ext.each(inputArray,function(input){
			input.className = "readonly";
	});
}

function mt_form_total(obj) {
	
	var formulaArray = Ext.query("input[formula]") ;
	
	Ext.each(formulaArray,function(input){
		
		var formula = input.formula ;
		formula = formula.replace(new RegExp("sum\\(","gm"),"mt_form_sum("); 
		formula = formula.replace(new RegExp("value\\(","gm"),"mt_form_value("); 
		formula = formula.replace(new RegExp("sumif\\(","gm"),"mt_form_sumif("); 
		formula = formula.replace(new RegExp("rowValue\\(","gm"),"mt_form_rowValue("); 
		formula = formula.replace(new RegExp("`","gm"),"'"); 
		formula = formula.replace(new RegExp("，","gm"),","); 
		formula = formula.replace(new RegExp("《","gm"),"<"); 
		formula = formula.replace(new RegExp("》","gm"),">"); 
		
		if(obj) {
			//只执行相关的
			var objName = obj.name ;
			if(formula.indexOf(objName) > -1) {
				
				if(formula) {
	 				var formulaValue = eval(formula) ;
	 				input.value = formulaValue ;
	 				input.fireEvent("onchange") ;
	 			}
			}
		}else {
			//执行全部
			if(formula) {
 				var formulaValue = eval(formula) ;
 				input.value = formulaValue ;
 				input.fireEvent("onchange") ;
 			}
		}
		
			
	});
}

function mt_form_sum(name){
	var sum = 0.00;
	var sumArray = document.getElementsByName(name) ;
	for(var i = 0;i<sumArray.length;i++){
		var sumValue = sumArray[i].value ;
		
		if(sumValue) {
			sum += parseFloat(sumValue);
		}
	}
	return sum ;
}
	
function mt_form_value(name){
		
	var sum = 0.00;
	var sumArray = document.getElementsByName(name) ;
	if(sumArray) {
		if(sumArray[0].value)
			sum += parseFloat(sumArray[0].value);
	}
	return sum ;
}
	
function mt_form_sumif(condition,name1,name2){
	
	var name1Arr = document.getElementsByName(name1) ;
	var name2Arr = document.getElementsByName(name2) ; 
	var forName = name1Arr ;
	if(name1Arr.length < 1) {
		forName = name2Arr ;
	}
	
	var sumValue = 0.00 ;
	for(var i = 0;i<forName.length;i++){
		var curCondition = condition.replace(new RegExp("\\\$rowObj","gm"),"curObj"); 
		var curObj = forName[i] ;
		var conditionResult ; 
		
		try {
			conditionResult = eval(curCondition);
		}catch(e) {
			alert("条件【" + condition + "】出现语法错误,错误原因："+e+"请联系管理员检查!") ;
			return ;
		}
		if(conditionResult) {
			if(name1Arr[i]) {
				sumValue += parseFloat(name1Arr[i].value ? name1Arr[i].value : 0) ;
			}
		}else {
			if(name2Arr[i]) {
				sumValue += parseFloat(name2Arr[i].value ? name2Arr[i].value : 0) ;
			}
		}
	}
	return sumValue ;
}

function mt_form_rowValue(name,obj){
	if(!obj) return ; 
	var srcElement = obj ;  
	
	var trObj = srcElement.parentNode.parentNode ;
	var trElement = Ext.fly(trObj) ;
	var curRowObj = trElement.child('input[name='+name+']',true) ;
	var value = 0.00;
	if(curRowObj) {
		value = curRowObj.value ;
	}
	if(!value) value = 0.00;
	return parseFloat(value) ;
}


function mt_form_initSubmit() {
	var formArray = Ext.query("form") ;
	
	Ext.each(formArray,function(form){
		form.tempSubmit = form.submit ;
		form.submit = function (){
			showWaiting();
			form.tempSubmit();
		};	 
	});
}

function mt_form_checkState(stateField) {
	var data = mt_form_getRowValues();
	if(!data) {
		return false;
	}

	for(var i=0; i < data.length; i++) {
		var state = eval("data[" + i + "]." + stateField);
		if(state != '草稿' && state != '退件') {
			alert("该数据状态为[" + state  + "],不允许操作该数据!!");
			return false;
		} 
	}
   
	return true;
}

function mt_form_saveUrl(){
	
	Ext.Ajax.request({
        url : 'formDefine.do'
        ,method:'post',
        params:{
            method:'saveUrl'
            ,url:window.location.href
            }

        ,success : function(response, options) {}
	});
	return true;
}

Ext.onReady(function(){
	mt_form_initReadonly();
	mt_form_initSubmit();
});/*
 * Really easy field validation with Prototype
 * http://tetlaw.id.au/view/blog/really-easy-field-validation-with-prototype
 * Andrew Tetlaw
 * Version 1.4 (2006-05-18)
 * Thanks:
 *  Mike Rumble http://www.mikerumble.co.uk/ for onblur idea
 *  Analgesia for spotting a typo
 *  Paul Shannon http://www.paulshannon.com for the reset idea
 *  Ted Wise for the focus-on-first-error idea
 *  Sidney http://www.creativelycrazy.de/ for the custom advice idea
 *
 * http://creativecommons.org/licenses/by-sa/2.5/
 */
Validator = Class.create();

Validator.prototype = {
	initialize : function(className, error, test) {
		this.test = test ? test : function(){ return true };
		this.error = error ? error : '��ֵ����Ƿ�.';
		this.className = className;
	}
}

var Validation = Class.create();

Validation.prototype = {
	initialize : function(form, options){
		this.options = Object.extend({
			stopOnFirst : false,
			immediate : false,
			focusOnError : true
		}, options || {});
		this.form = $(form);
		Event.observe(this.form,'submit',this.onSubmit.bind(this),false);
		if(this.options.immediate) {
			Form.getElements(this.form).each(function(input) { // Thanks Mike!
				Event.observe(input, 'blur', function(ev) { Validation.validate(Event.element(ev).id) });
			});
		}
	},
	onSubmit :  function(ev){
		if(!this.validate()) {
			Event.stop(ev);
			if(this.options.focusOnError) {
				$$('.validation-failed').first().focus();
			}
		}
	},
	validate : function() {
		var t;
		if(this.options.stopOnFirst) {
			t=Form.getElements(this.form).all(Validation.validate);
		} else {
			t=Form.getElements(this.form).collect(Validation.validate).all();
		}
		if (t) {
			//document.write("<span id=bxDlg_bg align=center oncontextmenu=\"return false\" onselectstart=\"return false\" style=\"visibility:hidden;width:100%;height:100%;position:absolute;left:0;top:0\"></span>");
			var scrollHeight=document.body.scrollTop;//��������������ĸ߶�
  			var winHeight = document.body.clientHeight;//���ڸ߶�
			var winWidth  = document.body.clientWidth;//���ڿ��
			var boxHeight=60;//�ı���߶�
			var boxWidth=200;//�ı�����
			var boxTop=winHeight/2-boxHeight/2+scrollHeight;//�ı������Ͻ����ڵ�������
			var boxLeft=winWidth/2-boxWidth/2;//�ı������Ͻ����ڵĺ�����

			var strTalk="<span id=bxDlg_bg align=center oncontextmenu=\"return false\" onselectstart=\"return false\" style=\"width:"+document.body.scrollWidth+";height:"+document.body.scrollHeight+";position:absolute;left:0;top:0\"><div id=bxDlg_bg1 style=height:100%;background:white;filter:alpha(opacity=50)>&nbsp;</div></span>"
				+"<span  style='background:#E4E4E4;POSITION:absolute;padding:20px 40px 20px 40px;"
    				+"left:"+boxLeft+";top:"+boxTop+"; width:"+boxWidth+"px; height:"+boxHeight+"px; border:1px solid #666666;'><img src='/AuditSystem/images/indicator.gif' />������<br/>,���Ժ򡭡�</span>";
    			//���������write�������ͻ�����submit�ļ����ύ������ְ���
    			document.body.insertAdjacentHTML("beforeEnd",strTalk);
    			document.close();
		}
		return t;
	},
	reset : function() {
		Form.getElements(this.form).each(Validation.reset);
	},
	check : function(){
		
		var t;
		if(this.options.stopOnFirst) {
			t=Form.getElements(this.form).all(Validation.validate);
		} else {
			t=Form.getElements(this.form).collect(Validation.validate).all();
		}
		return t;
	}
}

Object.extend(Validation, {
	validate : function(elm, index, options){ // index is here only because we use this function in Enumerations
		var options = Object.extend({}, options || {}); // options still under development and here as a placeholder only
		elm = $(elm);
		var cn = elm.classNames();
		/*
		try{
			alert(elm);
			alert(elm.parentNode.innerHTML);
			alert(this.parentNode.innerHTML);
		}catch(e){}
		*/
		return result = cn.all(Validation.test.bind(elm)); 
	},

	//winner�޸���20060529��������ǰ��ո���˹���
	trim : function (strSource){
		var t="";
		try{
		 t=strSource.replace(/^\s*/,'').replace(/\s*$/,'');
		}catch(e){}
		return t;
	},

	test : function(name) {
		
		var v = Validation.get(name);
		var prop = '__advice'+name.camelize();
		var passed =false;
		var backgroundvalid=false;
		//winner�޸���20060529��������ǰ��ո���˹��ܣ��������˺�̨У��Ĺ���
		//�����������б��ز���
		//����$F��Ȼȡ����File����Ϊ3Ԫ�����
		
		if(this.clone) { //��¡������input����֤
			return true;
		} 
		this.value = this.value.replace("��ѡ��...","") ;
		this.value = this.value.replace("��ѡ�������...","") ;
		
		//alert(Validation.isVisible(this) + this.name);
		if(!v.test(Validation.trim(((this.type=="file") ? this.value : $F(this)))) && Validation.isVisible(this)) {
			passed=false;
		}else{
			//����ͨ�������Ƿ�������valuemustexist�����������ύ��̨���������м��
			passed=true;
			//if (this.valuemustexist && this.valuemustexist=="true" && !(this.value==null || this.value=="")){
			//����CheckAnyWay on 20070824
			
			if ((this.valuemustexist && this.valuemustexist=="true" && !(this.value==null || this.value==""))
				||(this.CheckAnyWay && this.CheckAnyWay=="true")){
				//�Կ�����'+'��ֵ����ת��
				var corectValue = this.value;
				
				var newValue = "";
				if(corectValue!=null && corectValue != ""  && corectValue.indexOf('+') != -1 ) {
				  for(var i=0; i<corectValue.length; i++) {
					var s = corectValue.charAt(i);
				    if(s == '+') {
					  newValue += "%2B";
					}else {
					  newValue += s;
					}
				  }
				}else{
					newValue = corectValue;
				}
				//alert(newValue);

				
				var url="/AuditSystem/AS_SYSTEM/hint.do?checkmode=1&autoid="+this.autoid+"&pk1="+ newValue;
				
				if (this.refer){
					var qqq=document.getElementById(this.refer);
					if (qqq && qqq.value!=null && qqq.value!=""){
						url+="&refer="+qqq.value;
					}else{
						url+="&refer="+this.refer;
					}
				}
				if (this.refer1){
					var qqq=document.getElementById(this.refer1);
					if (qqq && qqq.value!=null && qqq.value!=""){
						url+="&refer1="+qqq.value;
					}else{
						url+="&refer1="+this.refer1;
					}
				}
				if (this.refer2){
					var qqq=document.getElementById(this.refer2);
					if (qqq && qqq.value!=null && qqq.value!=""){
						url+="&refer2="+qqq.value;
					}else{
						url+="&refer2="+this.refer2;
					}
				}

				//���к�̨У��
				var oBao = new ActiveXObject("Microsoft.XMLHTTP");
				//oBao.asynchronous=false;
  				oBao.open("POST",url,false);
  				oBao.send();
  				var strResult = unescape(oBao.responseText);
  				if(strResult.indexOf('ERROR')>=0){
  					passed=false;
  					backgroundvalid=true;
  				}
			}
		}
		
		if (passed==false){
			
			if(!this[prop]) {
				
				//�ж��Ƿ��Ѿ���ʾ����ʾ����û����ʾ����ʾ����룬
				var advice = Validation.getAdvice(name, this.name);
				
				if(typeof advice == 'undefined') { 
					advice = document.createElement('span');
					//winner �޸���20060528,������������ʾTITLE�Ĺ���
					/* winner ����ʹ��
					try{
						alert(this.tagName);
						alert(this.title);
						alert(this.parentNode.innerHTML);
					}catch(e){}

					*/
					//advice.appendChild(document.createTextNode(v.error));
					advice.appendChild(document.createTextNode(this.value && backgroundvalid ? "�����ֵ������" : (this.title ? this.title :v.error)));
					advice.className = 'validation-advice';
					advice.id = 'advice2-' + this.name; 
					advice.style.display = 'none';   
					this.parentNode.insertBefore(advice, this.nextSibling);
				}else{
					advice.className = 'validation-advice';
					advice.style.display = 'none';
					advice.innerHTML=(this.value ? "�����ֵ������" : (this.title ? this.title :v.error));
				}

				if(typeof Effect == 'undefined') {
					advice.style.display = 'inline';
				} else {
					new Effect.Appear(advice.id, {duration : 1 });
				}
			}else{
				var advice = Validation.getAdvice(name, this.name);
				//advice.innerHTML=(this.value ? "�����ֵ������" : (this.title ? this.title :v.error));
			}
			this[prop] = true;
			this.removeClassName('validation-passed');
			this.addClassName('validation-failed');


			//�����Ѿ���ʾ����ʾΪ��
			/*
			var hintadvice = Validation.getHintAdvice(this.name);
			if(typeof hintadvice != 'undefined') hintadvice.innerHTML="";
			*/
			
			return false;
		} else {
			var advice = Validation.getAdvice(name, this.name);
			if(typeof advice != 'undefined' && !advice.clone) advice.hide();
			this[prop] = '';
			this.removeClassName('validation-failed');
			this.addClassName('validation-passed');
			return true;
		}
	},
	isVisible : function(elm) {
		while(elm.tagName != 'BODY') {
			if(!$(elm).visible()) return false;
			elm = elm.parentNode;
		}
		return true; 
	},
	getAdvice : function(name, id) {
		var advice = Try.these(
			//function(){ return $('advice-' + name + '-' + id) },
			function(){
				var adviceObj = document.getElementById(id);
				if(adviceObj) {
					var tempId = "advice2-"+id ;
					var advice =  document.getElementById(tempId) ;;
					if(adviceObj.useAdvice) {
						adviceObj = document.getElementById('advice2-' + id) ;
					}
					
					if(!advice) {
						var newAdvice = document.createElement('span'); 
						newAdvice.id = tempId ;
						adviceObj.parentNode.insertBefore(newAdvice, adviceObj.nextSibling.nextSibling);
						return $(newAdvice.id);
					}
				}
				return $('advice2-' + id) 
			}
		);
		return advice;
	},
	getHintAdvice : function(name) {
		var advice = Try.these(
			function(){ return $('advice2-' + name) }
		);
		return advice;
	},
	reset : function(elm) {
		var cn = elm.classNames();
		cn.each(function(value) {
			var prop = '__advice'+value.camelize();
			if(elm[prop]) {
				var advice = Validation.getAdvice(value, elm.id);
				advice.hide();
				elm[prop] = '';
			}
			elm.removeClassName('validation-failed');
			elm.removeClassName('validation-passed');
		});
	},
	add : function(className, error, test, options) {
		var nv = {};
		nv[className] = new Validator(className, error, test, options);
		Object.extend(Validation.methods, nv);
	},
	addAllThese : function(validators) {
		var nv = {};
		$A(validators).each(function(value) {
				nv[value[0]] = new Validator(value[0], value[1], value[2], (value.length > 3 ? value[3] : {}));
			});
		Object.extend(Validation.methods, nv);
	},
	get : function(name) {
		return  Validation.methods[name] ? Validation.methods[name] : new Validator();
	},
	methods : {}
});

//var $V = Validation.validate;
//var $VG = Validation.get;
//var $VA = Validation.add;

Validation.add('IsEmpty', '', function(v) {
				return  ((v == null) || (v.length == 0) || /^\s+$/.test(v));
			});

Validation.addAllThese([
	/*-- У����� --*/
	['required', '��������Чֵ.', function(v) {
				//alert(v);
				return !Validation.get('IsEmpty').test(v);
			}],
	['checkexist-wheninputed', '��������Чֵ.', function(v) {

    		if (v==null || v==""){
    			return true;
    		}else{
				return !Validation.get('IsEmpty').test(v);
			}
			}],
	['validate-number', 'Please use numbers only in this field?', function(v) {
				return Validation.get('IsEmpty').test(v) || !isNaN(v);
			}],
	/*-- У������ --*/
	['validate-digits', '����������.', function(v) {

				return Validation.get('IsEmpty').test(v) ||  !/[^\d*$]/.test(v);
			}],
				/*-- У������ --*/
	['validate-positiveInt', '���������0������.', function(v) {

				return Validation.get('IsEmpty').test(v) || /^[0-9]*[1-9][0-9]*$/.test(v);
			}],
	['validate-alpha', 'Please use letters only (a-z) in this field.', function (v) {
				return Validation.get('IsEmpty').test(v) ||  /^[a-zA-Z]+$/.test(v)
			}],
	['validate-alphanum', 'Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.', function(v) {
				return Validation.get('IsEmpty').test(v) ||  !/\W/.test(v)
			}],
	['validate-date', 'Please enter a valid date.', function(v) {
				try{
				var test = new Date(v);
				return Validation.get('IsEmpty').test(v) || !isNaN(test);
				}catch(e){}
			}],
	/*-- У������ --*/
	['validate-email', '��������Ч����. ���� username@domain.com .', function (v) {
				return Validation.get('IsEmpty').test(v) || /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/.test(v)
			}],
	['validate-date-au', 'Please use this date format: dd/mm/yyyy. For example 17/03/2006 for the 17th of March, 2006.', function(v) {
				if(!Validation.get('IsEmpty').test(v)) {
					var upper = 31;
					if(/^(\d{2})\/(\d{2})\/(\d{4})$/.test(v)) { // dd/mm/yyyy
						if(RegExp.$2 == '02') upper = 29;
						if((RegExp.$1 <= upper) && (RegExp.$2 <= 12)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					return true;
				}
			}],
	/*-- У����� --*/
	['validate-currency', '��������Ч����.����100.00 .', function(v) {
				// [$]1[##][,###]+[.##]
				// [$]1###+[.##]
				// [$]0.##
				// [$].##
				return Validation.get('IsEmpty').test(v) ||  /^([1-9,-]{1}[0-9,-]{0,2}(\,[0-9,-]{3})*(\.[0-9,-]{0,2})?|[1-9,-]{1}\d*(\.[0-9,-]{0,2})?|0(\.[0-9,-]{0,2})?|(\.[0-9,-]{1,2})?)$/.test(v)
			}]

	/*  winner adds here	*/
	,
	/*-- У������Ϊ�վͲ���� --*/
	['validate-date-cn','��ʹ�����ڸ�ʽ: yyyy-mm-dd. ���� 2006-03-17', function(v){
    		/*-- ���ڸ�ʽ��(��λ)��� + (������λ)�·� + (������λ)���� ,�Ѿ����������������--*/
    		if (v==null || v==""){
    			return true;
    		}
     		if(!/^(?:([0-9]{4}-(?:(?:0?[1,3-9]|1[0-2])-(?:29|30)|((?:0?[13578]|1[02])-31)))|([0-9]{4}-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1\d|2[0-8]))|(((?:(\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))-0?2-29)))$/.test(v))
     		{
      			return false;
     		}
     		return true;
		}]
		,
	/*-- У������Ϊ�ջ���Ϊ��鲻ͨ�� --*/
	['validate-date-cn-required','��ʹ�����ڸ�ʽ: yyyy-mm-dd. ���� 2006-03-17', function(v){
    		/*-- ���ڸ�ʽ��(��λ)��� + (������λ)�·� + (������λ)���� ,�Ѿ����������������--*/
     		if(!/^(?:([0-9]{4}-(?:(?:0?[1,3-9]|1[0-2])-(?:29|30)|((?:0?[13578]|1[02])-31)))|([0-9]{4}-(?:0?[1-9]|1[0-2])-(?:0?[1-9]|1\d|2[0-8]))|(((?:(\d\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))-0?2-29)))$/.test(v))
     		{
      			return false;
     		}
     		return true;
		}]

	,
	/*-- У��������������,��ע����Ҫ��һ�����������ID����password --*/
	['validate-passwd-identical', '����������������һ��', function(v){
			if(Validation.get('IsEmpty').test(v) && Validation.get('IsEmpty').test($F("password"))){
				return true;
			}
        	return !Validation.get('IsEmpty').test(v) && v == $F("password");
    	}]
    	,
	/*-- У��绰���� --*/
	['validate-phonenumber', '�绰���������+��ͷ��ֻ����������,-���� ����020-12345678', function(v){
        	if(!/^[+]{0,1}(\d){1,3}[ ]?([-��]?((\d)|[ ]){1,12})+$/.test(v))
     		{
      			return false;
     		}
     		return true;
    	}]
	/*winner's add ends here*/
        ,
        /*-- У��绰���� ����Ϊ��--*/
	['phonenumber-wheninputed', '�绰���������+��ͷ��ֻ����������,-���� ����020-12345678', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^[+]{0,1}(\d){1,3}[ ]?([-��]?((\d)|[ ]){1,12})+$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
    	}]
        ,
        /*-- �����֤ ����Ϊ��--*/
	['year-wheninputed', '��������ĸ�������ɡ�', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^\d{4}$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
    	}]
        ,
        /*-- �·���֤ ����Ϊ��--*/
	['month-wheninputed', '�·���������������ɡ�', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^\d{2}$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
    	}]
    	
        ,
        /*-- ���֣���ĸ���»��ߣ��� - ---*/
	['alphanum-wheninputed', '���������֣���ĸ���»��ߣ��� - ��', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(!/^[\w-]{1,}[\w-]*$/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
    	}] 

        ,
        /*-- �ļ�����֤---*/
	['filename-wheninputed', '�ļ������ܰ���\\/:*?"<>|', function(v){
                if (v==null || v==""){
                  return true;
                }else{
                  if(/[\\\/\*\?"<>|]+/.test(v))
                  {
                  return false;
                  }
                  return true;
                }
    	}] 
		,
		/*-- 0��100��������֤ --*/
	['0-100-wheninputed', '������0��100������', function(v) {
				return (Validation.get('IsEmpty').test(v) || !isNaN(v))&&parseFloat(v)<100&&parseFloat(v)>0;
			}]
			
		,	
	/*-- ip,�����ַ����֤ --*/
	['ip-wheninputed', '������ip������ַ', function(v) {
				return (Validation.get('IsEmpty').test(v) || isIP(v));
			}]

]);


function setObjDisabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=true;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=true;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=true;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=true;
			if(sType=="CHECKBOX")oElem.disabled=true;
			if(sType=="RADIO")oElem.disabled=true;
			}
			break;
		default:
			oElem.disabled=true;
			break;
		}
	//set style
	oElem.style.backgroundColor="#eeeeee";
}

function setObjEnabled(name){
	var oElem=document.getElementById(name);
		var sTag=oElem.tagName.toUpperCase();
		switch(sTag)
		{
		case	"BUTTON":
			oElem.disabled=false;
			break;
		case	"SELECT":
		case	"TEXTAREA":
			oElem.readOnly=false;
			break;
		case	"INPUT":
			{
			var sType=oElem.type.toUpperCase();

			if(sType=="TEXT")oElem.readOnly=false;
			if(sType=="BUTTON"||sType=="IMAGE")oElem.disabled=false;
			if(sType=="CHECKBOX")oElem.disabled=false;
			if(sType=="RADIO")oElem.disabled=false;
			}
			break;
		default:
			oElem.disabled=false;
			break;
		}
	//set style
	oElem.style.backgroundColor="#FFFFFF";
}


function show(obj){
	$(obj).style.visibility=""
}

function hide(obj){
	$(obj).style.visibility="hidden"
}

function isIP(strIP) { 
	if (isNull(strIP)) return false; 
	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/   //ƥ��IP��ַ��������ʽ 
	var res= /^[a-zA-z0-9]+(\.[a-zA-z0-9]+)*$/  //ƥ���÷���������������ʽ 
	re=new RegExp(re);
	res=new RegExp(res);
	if(re.test(strIP)) 
	{ 
		if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)
		{
	
			return true;
		}
	} 
	if(res.test(strIP)){
		return true;
	}
	return false; 
} 
 
/* 
��;����������ַ����Ƿ�Ϊ�ջ���ȫ�����ǿո� 
���룺str 
���أ� 
���ȫ�ǿշ���true,���򷵻�false 
*/ 
function isNull( str ){ 
if ( str == "" ) return true; 
var regu = "^[ ]+$"; 
var re = new RegExp(regu); 
return re.test(str); 
} 
