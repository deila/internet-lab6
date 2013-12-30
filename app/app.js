Books = new Meteor.Collection('books')

if (Meteor.isClient) {
  // props

  Template.books.books = function () { return Books.find() }

  Template.book.book = function () {
    var book_id
    if (book_id = Session.get('book_id')) {
      return Books.findOne({ _id: book_id })
    }
    return null
  }

  // events

  Template.books.events({
    'click .book-link': function (event, template) {
      event.preventDefault()
      Session.set('book_id', this._id)
    }
  })

  Template.new_book.events({
    'submit form': function (event, template) {
      event.preventDefault()

      title = template.find('[name=title]')
      author = template.find('[name=author]')
      pub_org = template.find('[name=pub_org]')
      pub_year = template.find('[name=pub_year]')
      description = template.find('[name=description]')

      var data = {
        title: title.value,
        author: author.value,
        pub_org: pub_org.value,
        pub_year: pub_year.value,
        description: description.value
      }

      title.value = ''
      author.value = ''
      pub_org.value = ''
      pub_year.value = ''
      description.value = ''

      Books.insert(data, function (err, _id) {
        console.log(err)
        Session.set('book_id', _id)
      })
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () { })
}
