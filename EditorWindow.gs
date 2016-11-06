uses
	Gtk

class EditorWindow:Window

	construct( header:Header, body:DocumentView )
		this.window_position = WindowPosition.CENTER
		this.set_default_size( 400, 400 )
		this.destroy.connect( Gtk.main_quit)
		this.set_titlebar(header)
		var box  = new Box (Gtk.Orientation.VERTICAL, 1)
		box.pack_start(body, true, true, 0)
		this.add(box)
