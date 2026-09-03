Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-vrock"
  spec.version       = "1.1.1"
  spec.authors       = ["Tobias Geiser"]
  spec.email         = ["tobias.geiser@vrock.ch"]

  spec.summary       = "A modern Jekyll theme for technical teams."
  spec.description   = "VROCK is a modern Jekyll theme for technical teams that publish posts and showcase selected engineering work."
  spec.homepage      = "https://github.com/team-vrock/jekyll-theme-vrock"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.2"

  spec.files = Dir[
    "_includes/**/*",
    "_layouts/**/*",
    "_sass/**/*",
    "assets/**/*",
    "favicon.ico",
    "LICENSE",
    "README.md"
  ].select { |file| File.file?(file) }

  spec.add_runtime_dependency "jekyll", ">= 3.10", "< 5.0"
end
