app:
	valac \
	main.gs \
	createnew.gs \
	createnewbutton.gs \
	documentfileselector.gs \
	documentview.gs \
	EditorWindow.gs \
	header.gs \
	load.gs \
	openbutton.gs \
	savefile.gs \
	savefilebutton.gs \
	searchbutton.gs \
	text.gs \
	--pkg glib-2.0 \
	--pkg gee-0.8 \
	-X -DGETTEXT_PACKAGE \
	--pkg posix \
	--pkg gtk+-3.0 \
	-d /tmp \
	--output texteditor
