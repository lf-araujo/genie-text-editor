uses
	Gtk

class CreateNewButton:ToolButton
	construct( command:Command )
		this.icon_widget = new Image.from_icon_name(
												 "document-new",
												 IconSize.SMALL_TOOLBAR
												 )
		this.clicked.connect( command.execute )
