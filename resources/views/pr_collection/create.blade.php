<x-app-layout>
    <x-auth-card>
        <form method="POST" action="{{ route('pr_collection.store') }}">
            @csrf

            <!-- Title -->

            <div>
                <x-label for="title" value="Название коллекции" />

                <x-input id="title" class="block mt-1 w-full" type="text" name="title" :value="old('title')" required autofocus />
            </div>

            <!-- Image -->
            <!-- Description -->
            <!-- Specs -->
            <!-- Price -->
        </form>
    </x-auth-card>
</x-app-layout>