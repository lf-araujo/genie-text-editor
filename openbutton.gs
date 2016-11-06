uses
	Gtk


class OpenButton:ToolButton
	construct( command:Command )
		this.icon_widget = new Image.from_icon_name(
												 "document-open",
												 IconSize.SMALL_TOOLBAR
												 )
		this.clicked.connect( command.execute )
