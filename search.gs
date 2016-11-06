uses
	Gtk

class Search:Object implements Command

	_receiver:TextBuffer

	construct( receiver:TextBuffer )
		_receiver = receiver

	def execute()
		//text:string  =  SearchButton.search_what()

		//TextIter_forward_search()
