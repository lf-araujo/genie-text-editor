uses
	Gtk

class Header:HeaderBar
	construct( title:string = "" )
		this.show_close_button = true
		this.set_title( title )

	def add_item( item:Widget )
		this.pack_start( item )

	def add_search( item:Widget )
		this.pack_end (item)
