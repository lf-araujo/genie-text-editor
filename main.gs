/*
 * text editor - exercise 7_1.gs
 *
 * Copyright 2016 lc_addicted <>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 * Use the GtkTextView widget to create a simple text editor. You should
 * provide the ability to perform multiple text editing functions, including
 * creating a new document, opening a file, saving a file, searching the
 * document, cutting text, copying text, and pasting text.
 * When creating a new document, you should make sure the user actually wants
 * to continue, because all changes will be lost. When the Save button is
 * pressed, it should always ask where to save the file. Once you have finished
 * this exercise, one possible solution is shown in Appendix F.
 * Hint: This is a much larger GTK+ application than any that has previously
 * been created in this book, so you may want to take a few minutes to plan out
 * your solution on paper before diving right into the code. Then, implement one
 * function at a time, making sure it works before continuing on to the next
 * feature. We will expand on this exercise in later chapters as well, so keep
 * your solution handy!
 * This exercise is the first instance of the text editor application that you
 * will encounter. It asks you to implement all of the functionality of the text
 * editor.
 * ■ Note The downloadable exercise solution includes only very basic
 * functionality of a text editor. It is meant to get you started if you are
 * having trouble. However, you are encouraged to continue to expand your text
 * editor implementation beyond the provided solution!
 * There are a number of callback functions implemented for the text editor.
 * These are the ability to create a new file; open an existing file; save the
 * file; cut, copy, and paste selected text;and search for text in the document.
 * To create a new document, you should first ask the user whether or not the
 * application should continue with a GtkMessageDialog widget. If the user
 * chooses to continue, the downloadable exercise solution simply clears the
 * GtkTextBuffer object and destroys the dialog.
 * Otherwise, the dialog is just destroyed.
 * Opening a document in the provided solution does not ask the user for
 * confirmation, since it is easy to cancel the operation from the
 * GtkFileChooserDialog widget. The file chooser dialog has an action type of
 * GTK_FILE_CHOOSER_ACTION_OPEN. When a file is selected, its contents are read
 * with g_file_get_contents() and written into the text buffer. Saving in the
 * exercise solution asks for a new file name every time the button is pressed.
 * It calls g_file_set_contents() to save the text to the selected file.
 * The clipboard functions are similar to those provided in Chapter 7’s
 * clipboard example.
 * It uses the built-in text buffer functions for cut, copy, and paste actions.
 * These actions are performed on the default clipboard, GDK_SELECTION_CLIPBOARD.
 * The last callback function searches the current text for a case-sensitive
 * string. The solution used is similar to the function shown in Listing 7-6 in
 * Chapter 7, so  you should refer to its description for more information.
 *
 *  Example of Gtw.Window
 *
 *  class Application : Gtk.Window
 *
 * 	_view:Gtk.TextView
 *
 * 	construct ()
 *
 * 		//  Prepare Gtk.Window:
 * 		this.title = "My Gtk.TextView"
 * 		this.window_position = Gtk.WindowPosition.CENTER
 * 		this.destroy.connect (Gtk.main_quit)
 * 		this.set_default_size (400, 400)
 *
 * 		//  Box:
 * 		box:Gtk.Box = new Gtk.Box (Gtk.Orientation.VERTICAL, 1)
 * 		this.add (box)
 *
 * 		//  A ScrolledWindow:
 * 		scrolled:Gtk.ScrolledWindow = new Gtk.ScrolledWindow (null, null)
 * 		box.pack_start (scrolled, true, true, 0)
 *
 * 		//  The TextView:
 * 		_view = new Gtk.TextView ()
 * 		_view.set_wrap_mode (Gtk.WrapMode.WORD)
 * 		_view.buffer.text = "Lorem Ipsum"
 * 		scrolled.add (_view)
 *
 * 		//  A Button:
 * 		button:Gtk.Button = new Gtk.Button.with_label ("Print content to stdout")
 * 		box.pack_start (button, false, true, 0)
 * 		button.clicked.connect (clicked)
 *
 * 	//  This is a simple stub function to take care of the click
 * 	def clicked ()
 * 		stdout.puts (_view.buffer.text);
 * 		stdout.putc ('\n');
 *
 * init
 * 	Gtk.init (ref args)
 * 	var app = new Application ()
 * 	app.show_all ()
 * 	Gtk.main ()
 * // valac --pkg gtk+-3.0 Gtk.TextView.vala
 *
 */

uses
	Gtk

init
	Intl.setlocale()
	Gtk.init (ref args)

	var document = new Text( "Lorem Ipsum" )

	var header = new Header ( "My text editor" )
	var body = new DocumentView( document )
	var editor = new EditorWindow (header,body )

	var document_selector = new DocumentFileSelector( editor )
	var load_new_content_command = new Load( document, document_selector )
	var create_new = new CreateNew( document )
	var save_file = new SaveFile( document, document_selector )
	//var search = new Search( document )

	header.add_item( new OpenButton( load_new_content_command ) )
	header.add_item( new CreateNewButton ( create_new ) )
	header.add_item( new SaveFileButton( save_file ))
	//header.add_search( new SearchButton( search ))

	editor.show_all ()
	Gtk.main ()

interface Command:Object
	def abstract execute()

interface DocumentSelector:Object
	def abstract select():bool
	def abstract get_document():string
