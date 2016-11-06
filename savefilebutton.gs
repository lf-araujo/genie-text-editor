uses
	Gtk

class SaveFileButton:ToolButton
	construct( command:Command )
		this.icon_widget = new Image.from_icon_name(
												 "document-save",
												 IconSize.SMALL_TOOLBAR
												 )
		this.clicked.connect( command.execute )
