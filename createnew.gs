uses
	Gtk

class CreateNew:Object implements Command

	_receiver:TextBuffer

	construct( receiver:TextBuffer )
		_receiver = receiver

	def execute()
		var should_I_save=new MessageDialog (null, Gtk.DialogFlags.MODAL,
		Gtk.MessageType.INFO, Gtk.ButtonsType.YES_NO, "New file")
		should_I_save.format_secondary_text (
		"This will delete the contets. Are you sure?")

		case should_I_save.run()
			when ResponseType.YES
				_receiver.set_text("")
				should_I_save.destroy ()
			when ResponseType.NO
				should_I_save.destroy ()
