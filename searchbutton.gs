uses
	Gtk

class SearchButton:ToolButton
	_search_entry:Gtk.SearchEntry
	_search_entry_revealer:Gtk.Revealer
	_search_button_revealer:Gtk.Revealer
	_search_visible:bool

	construct( command:Command )

		var search_box = new Gtk.Box (Gtk.Orientation.HORIZONTAL, 0);
		_search_entry:Gtk.SearchEntry = new Gtk.SearchEntry();
		_search_entry.editable = true;
		_search_entry.visibility = true;
		_search_entry.expand = true;
		_search_entry.max_width_chars = 30;
		_search_entry.margin_right = 12;

		_search_entry_revealer:Gtk.Revealer = new Gtk.Revealer();
		_search_button_revealer:Gtk.Revealer = new Gtk.Revealer();
		_search_entry_revealer.transition_type = Gtk.RevealerTransitionType.SLIDE_LEFT;
		_search_button_revealer.transition_type = Gtk.RevealerTransitionType.SLIDE_LEFT;

		this.has_tooltip = true
		this.tooltip_text = "Search"
		this.clicked.connect(show_search)
		this.icon_widget = new Image.from_icon_name ("edit-find-symbolic",
		Gtk.IconSize.LARGE_TOOLBAR)
		this.clicked.connect( show_all )

		_search_button_revealer.add(this)
		_search_entry_revealer.add(_search_entry)
		_search_entry_revealer.reveal_child = false
		_search_button_revealer.reveal_child = true

		// Add to the toolbar
		search_box.add (_search_button_revealer)
		search_box.add (_search_entry_revealer)


	def show_search()
		_search_button_revealer.reveal_child = false
		_search_entry_revealer.reveal_child = true
		show_all()
		_search_visible = true
		_search_entry.can_focus = true
		_search_entry.grab_focus()

		//text:string=_search_entry.text

	def hide_search()
		_search_entry_revealer.reveal_child = false
		_search_button_revealer.reveal_child = true
		show_all()
		_search_visible = false

	def search_what():string
		return _search_entry.text
