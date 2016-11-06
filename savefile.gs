uses
	Gtk

class SaveFile:Object implements Command

	_receiver:TextBuffer
	_document_selector:DocumentFileSelector

	construct( receiver:TextBuffer, document_selector:DocumentFileSelector )
		_receiver = receiver
		_document_selector =  document_selector

	def execute()
		start, end : Gtk.TextIter
		_receiver.get_start_iter(out start)
		_receiver.get_end_iter(out end)
		try
			FileUtils.set_contents (_document_selector.whichFile(),
			_receiver.get_text(start, end,false))
		except ex : FileError
			print "%s\n", ex.message
