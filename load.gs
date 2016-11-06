uses
	Gtk

class Load:Object implements Command

	_receiver:TextBuffer
	_document_selector:DocumentSelector

	construct( receiver:TextBuffer, document_selector:DocumentSelector )
		_receiver = receiver
		_document_selector = document_selector

	def execute()
		if _document_selector.select()
			_receiver.text = _document_selector.get_document()
