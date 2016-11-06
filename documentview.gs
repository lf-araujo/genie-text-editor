uses
	Gtk

class DocumentView:ScrolledWindow
	construct( document:TextBuffer )
		var view = new TextView.with_buffer( document )
		view.set_wrap_mode( Gtk.WrapMode.WORD )
		this.add( view )
