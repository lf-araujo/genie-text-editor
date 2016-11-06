uses
	Gtk

class DocumentFileSelector:Object implements DocumentSelector

	_parent:Window
	_uri:string = ""
	_filename:string = ""

	construct( parent:Window )
		_parent = parent

	def select():bool
		var dialog = new FileChooserDialog( "Open file",
											_parent,
											FileChooserAction.OPEN,
											dgettext( "gtk30", "_OK"),
											ResponseType.ACCEPT,
											dgettext( "gtk30", "_Cancel" ),
											ResponseType.CANCEL
										   )

		selected:bool = false
		var response = dialog.run()
		case response
			when ResponseType.ACCEPT
				_filename = dialog.get_filename()
				_uri = dialog.get_uri()
				selected = true
		dialog.destroy()
		return selected

	def whichFile():string
		return _uri

	def get_document():string
		text : string
		len : size_t
		try
			FileUtils.get_contents (_filename, out text, out len)
		except ex : FileError
			print "%s\n", ex.message
		return text
